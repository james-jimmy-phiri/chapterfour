<?php

namespace App\Enums;

enum UserStatus: string
{
    case Active = 'active';
    case Inactive = 'inactive';
    case Suspended = 'suspended';
    case Pending = 'pending';

    public function label(): string
    {
        return match ($this) {
            self::Active => 'Active',
            self::Inactive => 'Inactive',
            self::Suspended => 'Suspended',
            self::Pending => 'Pending Verification',
        };
    }

    public function badgeClasses(): string
    {
        return match ($this) {
            self::Active => 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            self::Inactive => 'bg-slate-500/10 text-slate-400 border-slate-500/20',
            self::Suspended => 'bg-rose-500/10 text-rose-400 border-rose-500/20',
            self::Pending => 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        };
    }
}
