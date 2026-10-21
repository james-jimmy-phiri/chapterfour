<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\AuditLogger;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class MediaController extends Controller
{
    /**
     * Display the Media Library page.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $filterType = $request->query('type'); // image, document, all

        // Ensure public/media directory exists
        Storage::disk('public')->makeDirectory('media');

        $files = Storage::disk('public')->allFiles('media');
        $mediaItems = [];

        foreach ($files as $file) {
            $name = basename($file);
            if (Str::startsWith($name, '.')) continue;

            $mime = Storage::disk('public')->mimeType($file) ?: 'application/octet-stream';
            $size = Storage::disk('public')->size($file);
            $lastModified = Storage::disk('public')->lastModified($file);
            $url = '/storage/' . $file;

            $isImage = Str::startsWith($mime, 'image/');
            $isPdf = $mime === 'application/pdf' || Str::endsWith($name, '.pdf');
            $isDoc = Str::contains($mime, ['word', 'document', 'msword', 'officedocument']) || Str::endsWith($name, ['.doc', '.docx']);

            $type = $isImage ? 'image' : ($isPdf ? 'pdf' : ($isDoc ? 'document' : 'file'));

            if ($filterType && $filterType !== 'all') {
                if ($filterType === 'image' && !$isImage) continue;
                if ($filterType === 'document' && !($isPdf || $isDoc)) continue;
            }

            if ($search && !Str::contains(strtolower($name), strtolower($search))) {
                continue;
            }

            $mediaItems[] = [
                'id'            => md5($file),
                'path'          => $file,
                'name'          => $name,
                'url'           => $url,
                'mime'          => $mime,
                'size'          => $size,
                'size_formatted'=> $this->formatBytes($size),
                'type'          => $type,
                'updated_at'    => date('Y-m-d H:i:s', $lastModified),
            ];
        }

        // Sort latest first
        usort($mediaItems, fn ($a, $b) => strcmp($b['updated_at'], $a['updated_at']));

        $totalSize = array_sum(array_column($mediaItems, 'size'));

        return Inertia::render('Admin/Media/Index', [
            'media' => $mediaItems,
            'stats' => [
                'total_files' => count($mediaItems),
                'total_size'  => $this->formatBytes($totalSize),
            ],
            'filters' => [
                'search' => $search ?? '',
                'type'   => $filterType ?? 'all',
            ],
        ]);
    }

    /**
     * Upload new media asset(s).
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'files'   => 'nullable|array',
            'files.*' => 'file|max:51200', // 50MB max per file
            'file'    => 'nullable|file|max:51200',
        ]);

        $uploadedFiles = [];
        if ($request->hasFile('files')) {
            $uploadedFiles = $request->file('files');
        } elseif ($request->hasFile('file')) {
            $uploadedFiles = [$request->file('file')];
        }

        $count = 0;
        foreach ($uploadedFiles as $uploaded) {
            $originalName = pathinfo($uploaded->getClientOriginalName(), PATHINFO_FILENAME);
            $extension = $uploaded->getClientOriginalExtension();
            $safeName = Str::slug($originalName) . '-' . time() . '.' . $extension;

            $uploaded->storeAs('media', $safeName, 'public');
            $count++;
        }

        AuditLogger::log('uploaded', 'Media', null, ['count' => $count]);

        return redirect()->back()->with('success', "{$count} file(s) uploaded successfully.");
    }

    /**
     * Delete media file.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'path' => 'required|string',
        ]);

        $path = $validated['path'];

        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
            AuditLogger::log('deleted', 'Media', null, ['path' => $path]);
            return redirect()->back()->with('success', 'File deleted successfully.');
        }

        return redirect()->back()->with('error', 'File not found.');
    }

    private function formatBytes(int $bytes, int $precision = 2): string
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= pow(1024, $pow);
        return round($bytes, $precision) . ' ' . $units[$pow];
    }
}
