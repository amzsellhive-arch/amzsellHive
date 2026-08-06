<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Thanks for reaching out to SellHive</title>
    <style>
        body { font-family: Arial, Helvetica, sans-serif; background: #f6f6f6; color: #1a1a1a; margin: 0; padding: 0; }
        .container { max-width: 560px; margin: 30px auto; background: #ffffff; border-radius: 12px; overflow: hidden; }
        .header { background: #1a1a1a; padding: 28px 32px; }
        .header h1 { color: #ffffff; margin: 0; font-size: 22px; }
        .body { padding: 32px; }
        .body p { font-size: 15px; line-height: 1.6; color: #444; }
        .brand { color: #e85d2a; font-weight: bold; }
        .footer { padding: 20px 32px; background: #faf6f3; border-top: 1px solid #eee; font-size: 12px; color: #888; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Thanks for reaching out, {{ $lead->name }}!</h1>
        </div>
        <div class="body">
            <p>Hi {{ $lead->name }},</p>
            <p>We received your message and we're on it. One of us — usually <span class="brand">Ishfaq</span> — will get back to you within one business day.</p>
            <p>While you wait, if your reason for reaching out is wasted ad spend, requesting the <strong>free account audit</strong> is the fastest way to get something useful back.</p>
            <p>Thanks,<br>The SellHive team</p>
        </div>
        <div class="footer">
            © {{ date('Y') }} SellHive. Founder-led Amazon management.
        </div>
    </div>
</body>
</html>
