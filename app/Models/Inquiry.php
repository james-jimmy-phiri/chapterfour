<?php

namespace App\Models;

use App\Enums\InquiryStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Inquiry extends Model
{
    protected $fillable = [
        'type', 'name', 'email', 'phone', 'subject', 'message',
        'status', 'internal_notes', 'assigned_to', 'ip_address',
    ];

    protected function casts(): array
    {
        return ['status' => InquiryStatus::class];
    }

    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}
