<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserService
{
    public function __construct(
        protected AuditService $audit
    ) {}

    public function getPaginatedUsers(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = User::with('roles');

        // Search filter
        if (! empty($filters['search'])) {
            $search = trim($filters['search']);
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('employee_id', 'like', "%{$search}%")
                    ->orWhere('job_title', 'like', "%{$search}%");
            });
        }

        // Status filter
        if (! empty($filters['status']) && $filters['status'] !== 'all') {
            if ($filters['status'] === 'trashed') {
                $query->onlyTrashed();
            } else {
                $query->where('status', $filters['status']);
            }
        }

        // Role filter
        if (! empty($filters['role']) && $filters['role'] !== 'all') {
            $query->whereHas('roles', function ($q) use ($filters) {
                $q->where('name', $filters['role']);
            });
        }

        // Department filter
        if (! empty($filters['department']) && $filters['department'] !== 'all') {
            $query->where('department', $filters['department']);
        }

        return $query->latest('id')->paginate($perPage)->withQueryString();
    }

    public function getUserStats(): array
    {
        return [
            'total' => User::count(),
            'active' => User::where('status', 'active')->count(),
            'pending' => User::where('status', 'pending')->count(),
            'suspended' => User::where('status', 'suspended')->count(),
            'inactive' => User::where('status', 'inactive')->count(),
            'trashed' => User::onlyTrashed()->count(),
        ];
    }

    public function getDepartments(): array
    {
        return [
            'Legal & Advocacy',
            'Executive',
            'Communications',
            'Finance & Administration',
            'Programs',
            'Research & Policy',
        ];
    }

    public function createUser(array $data, ?UploadedFile $avatar = null, array $roles = []): User
    {
        if ($avatar) {
            $path = $avatar->store('avatars', 'public');
            $data['avatar'] = $path;
        }

        if (! empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            $data['password'] = Hash::make('ChapterFour@2026');
        }

        if (empty($data['status'])) {
            $data['status'] = 'active';
        }

        $user = User::create($data);

        if (! empty($roles)) {
            $user->syncRoles($roles);
        }

        $this->audit->log('user.created', $user, [
            'email' => $user->email,
            'name' => $user->name,
            'roles' => $user->getRoleNames(),
        ]);

        return $user;
    }

    public function updateUser(User $user, array $data, ?UploadedFile $avatar = null, ?array $roles = null): User
    {
        if ($avatar) {
            // Delete existing avatar if it exists and is stored locally
            if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                Storage::disk('public')->delete($user->avatar);
            }
            $data['avatar'] = $avatar->store('avatars', 'public');
        }

        if (! empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
            $data['password_changed_at'] = now();
        } else {
            unset($data['password']);
        }

        $user->update($data);

        if ($roles !== null) {
            $user->syncRoles($roles);
        }

        $this->audit->log('user.updated', $user, [
            'email' => $user->email,
            'name' => $user->name,
            'roles' => $user->getRoleNames(),
        ]);

        return $user;
    }

    public function deleteUser(User $user): bool
    {
        $this->audit->log('user.deleted', $user, [
            'email' => $user->email,
            'name' => $user->name,
        ]);

        return (bool) $user->delete();
    }

    public function restoreUser(int $id): User
    {
        $user = User::withTrashed()->findOrFail($id);
        $user->restore();

        $this->audit->log('user.restored', $user, [
            'email' => $user->email,
            'name' => $user->name,
        ]);

        return $user;
    }

    public function updateStatus(User $user, string $status): User
    {
        $oldStatus = $user->status;
        $user->update(['status' => $status]);

        $this->audit->log('user.status_changed', $user, [
            'old_status' => $oldStatus,
            'new_status' => $status,
        ]);

        return $user;
    }
}
