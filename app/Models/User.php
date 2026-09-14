<?php

namespace App\Models;

use App\Enums\UserStatus;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, HasRoles, Notifiable, SoftDeletes, TwoFactorAuthenticatable;

    protected $fillable = [
        'first_name',
        'last_name',
        'name',
        'email',
        'phone',
        'avatar',
        'job_title',
        'department',
        'employee_id',
        'status',
        'email_verified_at',
        'password',
        'password_changed_at',
        'last_login_at',
    ];

    protected $appends = [
        'avatar_url',
        'full_name',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password_changed_at' => 'datetime',
            'last_login_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'status' => UserStatus::class,
        ];
    }

    protected static function booted(): void
    {
        static::saving(function (User $user) {
            // Auto-populate first_name and last_name if name provided
            if ((empty($user->first_name) || empty($user->last_name)) && ! empty($user->name)) {
                $parts = explode(' ', trim($user->name), 2);
                $user->first_name = $user->first_name ?: ($parts[0] ?? 'User');
                $user->last_name = $user->last_name ?: ($parts[1] ?? ($parts[0] ?? 'User'));
            }

            // Auto-populate name if first_name / last_name provided
            if (empty($user->name)) {
                $user->name = trim(($user->first_name ?? '') . ' ' . ($user->last_name ?? ''));
            }
        });
    }

    public function getFullNameAttribute(): string
    {
        return trim(($this->first_name ?? '') . ' ' . ($this->last_name ?? '')) ?: ($this->name ?? '');
    }

    public function getAvatarUrlAttribute(): string
    {
        if ($this->avatar) {
            return str_starts_with($this->avatar, 'http')
                ? $this->avatar
                : asset('storage/' . $this->avatar);
        }

        $initials = urlencode(substr($this->first_name ?? $this->name ?? 'U', 0, 1) . substr($this->last_name ?? '', 0, 1));
        return "https://ui-avatars.com/api/?name={$initials}&background=0f172a&color=f59e0b&bold=true";
    }

    public function isActive(): bool
    {
        $statusValue = $this->status instanceof UserStatus ? $this->status->value : $this->status;
        return $statusValue === 'active';
    }

    public function isSuspended(): bool
    {
        $statusValue = $this->status instanceof UserStatus ? $this->status->value : $this->status;
        return $statusValue === 'suspended';
    }

    public function requiresTwoFactorSetup(): bool
    {
        if (! $this->hasAnyRole(['super-admin', 'admin'])) {
            return false;
        }

        return $this->two_factor_secret === null;
    }
}
