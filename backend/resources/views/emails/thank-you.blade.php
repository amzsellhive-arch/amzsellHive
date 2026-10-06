<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Thanks for reaching out to SellHive</title>
</head>
<body style="margin:0;padding:0;background:#F6F8FB;font-family:Arial,Helvetica,sans-serif;color:#08233F;">
    <div style="max-width:560px;margin:30px auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #E5E9F0;">
        <div style="background:#061B3A;padding:26px 32px;">
            <div style="font-size:22px;font-weight:800;color:#ffffff;">Sell<span style="color:#FFC400;">Hive</span></div>
            <h1 style="margin:12px 0 0;font-size:21px;color:#ffffff;">Thanks for reaching out, {{ $lead->name }}!</h1>
        </div>
        <div style="padding:28px 32px;font-size:15px;line-height:1.65;color:#334155;">
            <p style="margin-top:0;">Hi {{ $lead->name }},</p>
            @if ($lead->service_interest === 'Free Account Audit')
                <p>We’ve received your <strong style="color:#08233F;">free Amazon account audit</strong> request. We’ll review your details and get back to you within one business day with the next step.</p>
            @else
                <p>We’ve received your message. Our team will review it and get back to you within one business day.</p>
                <p>If your main concern is wasted ad spend, the <a href="{{ rtrim(env('FRONTEND_URL', 'https://sellhive.net'), '/') }}/audit" style="color:#155EEF;font-weight:bold;">free account audit</a> is the fastest way to get something useful back.</p>
            @endif
            <p style="margin-bottom:0;">Thanks,<br><strong style="color:#08233F;">The SellHive Team</strong></p>
        </div>
        <div style="padding:16px 32px;background:#F6F8FB;border-top:1px solid #E5E9F0;font-size:12px;color:#64748B;">
            © {{ date('Y') }} SellHive · Amazon growth, measured in net profit.
        </div>
    </div>
</body>
</html>
