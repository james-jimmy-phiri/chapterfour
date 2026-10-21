<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: system-ui, sans-serif; background: #f8fafc; color: #334155; padding: 0; margin: 0; }
        .wrapper { max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
        .header { background: #0f172a; padding: 28px 32px; }
        .header h1 { color: #f59e0b; font-size: 20px; margin: 0; font-weight: 700; }
        .header p { color: #94a3b8; font-size: 13px; margin: 4px 0 0; }
        .body { padding: 32px; }
        .badge { display: inline-block; background: #f59e0b; color: #0f172a; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 20px; }
        .field { margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px; }
        .field:last-child { border-bottom: none; }
        .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #94a3b8; margin-bottom: 4px; }
        .value { font-size: 14px; color: #1e293b; }
        .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.7; color: #334155; white-space: pre-wrap; }
        .footer { padding: 20px 32px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; }
        .btn { display: inline-block; margin-top: 20px; padding: 12px 24px; background: #b91c1c; color: white; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; }
    </style>
</head>
<body>
<div class="wrapper">
    <div class="header">
        <h1>Chapter Four Malawi</h1>
        <p>New inquiry received via the website</p>
    </div>
    <div class="body">
        <div class="badge">{{ $inquiry->type }}</div>

        <div class="field">
            <div class="label">From</div>
            <div class="value">{{ $inquiry->name ?? 'Anonymous' }}</div>
        </div>
        <div class="field">
            <div class="label">Email</div>
            <div class="value">{{ $inquiry->email ?? '—' }}</div>
        </div>
        @if($inquiry->phone)
        <div class="field">
            <div class="label">Phone</div>
            <div class="value">{{ $inquiry->phone }}</div>
        </div>
        @endif
        <div class="field">
            <div class="label">Subject</div>
            <div class="value">{{ $inquiry->subject ?? '—' }}</div>
        </div>
        <div class="field">
            <div class="label">Message</div>
            <div class="message-box">{{ $inquiry->message }}</div>
        </div>
        <div class="field">
            <div class="label">Submitted At</div>
            <div class="value">{{ $inquiry->created_at?->format('D, d M Y \a\t H:i') }} CAT</div>
        </div>

        <a href="{{ config('app.url') }}/admin/inquiries" class="btn">View in Admin Panel →</a>
    </div>
    <div class="footer">
        This notification was sent automatically from the Chapter Four website contact system. Do not reply to this email.
    </div>
</div>
</body>
</html>
