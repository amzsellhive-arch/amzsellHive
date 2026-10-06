<?php

namespace App\Mail;

use App\Models\Lead;
use Illuminate\Mail\Mailable;

// Alert sent to admin whenever a new lead / audit request comes in.
class NewLeadNotification extends Mailable
{
    public function __construct(public Lead $lead) {}

    public function build()
    {
        $type = $this->lead->service_interest === 'Free Account Audit' ? 'New audit request' : 'New contact message';

        return $this->subject($type . ': ' . $this->lead->name . ($this->lead->brand ? ' (' . $this->lead->brand . ')' : ''))
            // "Reply" in the inbox goes straight to the person who filled the form
            ->replyTo($this->lead->email, $this->lead->name)
            ->view('emails.new-lead', ['type' => $type]);
    }
}
