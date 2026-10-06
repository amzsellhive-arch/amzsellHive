<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{{ $type ?? 'New lead' }}</title>
</head>
<body style="margin:0;padding:0;background:#F6F8FB;font-family:Arial,Helvetica,sans-serif;color:#08233F;">
    <div style="max-width:560px;margin:30px auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #E5E9F0;">
        <div style="background:#061B3A;padding:22px 32px;">
            <div style="font-size:22px;font-weight:800;color:#ffffff;">Sell<span style="color:#FFC400;">Hive</span></div>
            <div style="margin-top:6px;font-size:13px;font-weight:bold;letter-spacing:.6px;text-transform:uppercase;color:#FFC400;">{{ $type ?? 'New lead' }}</div>
        </div>
        <div style="padding:28px 32px;">
            @php
                $fields = [
                    'Name' => $lead->name,
                    'Email' => $lead->email,
                    'Brand / Store' => $lead->brand,
                    'Phone' => $lead->phone,
                    'Needs help with' => $lead->service_interest,
                    'Budget range' => $lead->budget_range,
                ];
            @endphp
            @foreach ($fields as $label => $value)
                @if ($value)
                <div style="margin-bottom:14px;">
                    <div style="font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:#64748B;margin-bottom:3px;">{{ $label }}</div>
                    <div style="font-size:15px;color:#08233F;">
                        @if ($label === 'Email')
                            <a href="mailto:{{ $value }}" style="color:#155EEF;">{{ $value }}</a>
                        @else
                            {{ $value }}
                        @endif
                    </div>
                </div>
                @endif
            @endforeach
            @if ($lead->message)
            <div style="margin-top:6px;">
                <div style="font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:#64748B;margin-bottom:6px;">Message</div>
                <div style="font-size:15px;line-height:1.6;background:#F6F8FB;border-left:3px solid #FFC400;padding:12px 14px;border-radius:6px;">{!! nl2br(e($lead->message)) !!}</div>
            </div>
            @endif
            <div style="margin-top:26px;">
                <a href="{{ rtrim(env('FRONTEND_URL', 'https://sellhive.net'), '/') }}/admin" style="display:inline-block;background:#FFC400;color:#08233F;font-weight:bold;text-decoration:none;padding:12px 22px;border-radius:8px;">Open admin panel</a>
            </div>
        </div>
        <div style="padding:16px 32px;background:#F6F8FB;border-top:1px solid #E5E9F0;font-size:12px;color:#64748B;">
            Tip: just hit <strong>Reply</strong> to answer {{ $lead->name }} directly.
        </div>
    </div>
</body>
</html>
