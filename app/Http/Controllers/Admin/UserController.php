<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Models\User;
use App\Services\RoleService;
use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function __construct(
        protected UserService $userService,
        protected RoleService $roleService
    ) {}

    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'status', 'role', 'department']);
        $users = $this->userService->getPaginatedUsers($filters);
        $stats = $this->userService->getUserStats();
        $roles = $this->roleService->getAllRoles();
        $departments = $this->userService->getDepartments();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'stats' => $stats,
            'filters' => [
                'search' => $filters['search'] ?? '',
                'status' => $filters['status'] ?? 'all',
                'role' => $filters['role'] ?? 'all',
                'department' => $filters['department'] ?? 'all',
            ],
            'roles' => $roles,
            'departments' => $departments,
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $roles = $validated['roles'] ?? [];
        unset($validated['roles']);

        $this->userService->createUser(
            $validated,
            $request->file('avatar'),
            $roles
        );

        return redirect()->back()->with('success', 'User account created successfully.');
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $validated = $request->validated();
        $roles = $validated['roles'] ?? null;
        unset($validated['roles']);

        $this->userService->updateUser(
            $user,
            $validated,
            $request->file('avatar'),
            $roles
        );

        return redirect()->back()->with('success', 'User account updated successfully.');
    }

    public function destroy(User $user): RedirectResponse
    {
        if ($user->id === auth()->id()) {
            return redirect()->back()->with('error', 'You cannot delete your own active administrator account.');
        }

        if ($user->hasRole('super-admin') && User::role('super-admin')->count() <= 1) {
            return redirect()->back()->with('error', 'Cannot delete the only remaining Super Administrator.');
        }

        $this->userService->deleteUser($user);

        return redirect()->back()->with('success', 'User account deleted successfully.');
    }

    public function restore(int $id): RedirectResponse
    {
        $this->userService->restoreUser($id);

        return redirect()->back()->with('success', 'User account restored successfully.');
    }

    public function updateStatus(Request $request, User $user): RedirectResponse
    {
        $request->validate([
            'status' => ['required', 'in:active,inactive,suspended,pending'],
        ]);

        if ($user->id === auth()->id() && in_array($request->status, ['inactive', 'suspended'])) {
            return redirect()->back()->with('error', 'You cannot suspend or deactivate your own account.');
        }

        $this->userService->updateStatus($user, $request->status);

        return redirect()->back()->with('success', "User account status updated to {$request->status}.");
    }
}
