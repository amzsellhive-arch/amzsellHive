<?php

namespace App\Mail;

use App\Models\Lead;
use Illuminate\Mail\Mailable;

// Alert sent to admin whenever a new lead comes in
class NewLeadNotification extends Mailable
{
    public function __construct(public Lead $lead) {}

    public function build()
    {
        return $this->subject('New lead: ' . $this->lead->name)
            ->view('emails.new-lead'); // TODO: create blade view
    }
}
