<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Lead</title>
    <style>
        body { font-family: Arial, Helvetica, sans-serif; background: #f6f6f6; color: #1a1a1a; margin: 0; padding: 0; }
        .container { max-width: 560px; margin: 30px auto; background: #ffffff; border-radius: 12px; overflow: hidden; }
        .header { background: #e85d2a; padding: 24px 32px; }
        .header h1 { color: #ffffff; margin: 0; font-size: 20px; }
        .body { padding: 32px; }
        .field { margin-bottom: 16px; }
        .field .label { font-size: 11px; text-transform: uppercase; letter-spacing: .5px; color: #888; margin-bottom: 4px; }
        .field .value { font-size: 15px; color: #1a1a1a; }
        .footer { padding: 20px 32px; background: #faf6f3; border-top: 1px solid #eee; font-size: 12px; color: #888; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New lead: {{ $lead->name }}</h1>
        </div>
        <div class="body">
            <div class="field"><div class="label">Name</div><div class="value">{{ $lead->name }}</div></div>
            <div class="field"><div class="label">Email</div><div class="value">{{ $lead->email }}</div></div>
            @if($lead->brand)
            <div class="field"><div class="label">Brand</div><div class="value">{{ $lead->brand }}</div></div>
            @endif
            @if($lead->phone)
            <div class="field"><div class="label">Phone</div><div class="value">{{ $lead->phone }}</div></div>
            @endif
            @if($lead->service_interest)
            <div class="field"><div class="label">Service Interest</div><div class="value">{{ $lead->service_interest }}</div></div>
            @endif
            @if($lead->budget_range)
            <div class="field"><div class="label">Budget Range</div><div class="value">{{ $lead->budget_range }}</div></div>
            @endif
            @if($lead->message)
            <div class="field"><div class="label">Message</div><div class="value">{{ $lead->message }}</div></div>
            @endif
        </div>
        <div class="footer">
            Log in to the admin panel to update this lead's status.
        </div>
    </div>
</body>
</html>
