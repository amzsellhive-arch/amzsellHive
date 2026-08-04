<?php

namespace App\Mail;

use App\Models\Lead;
use Illuminate\Mail\Mailable;

// Auto-reply sent to the client right after form submission
class ThankYouMail extends Mailable
{
    public function __construct(public Lead $lead) {}

    public function build()
    {
        return $this->subject('Thanks for reaching out to SellHive')
            ->view('emails.thank-you'); // TODO: create blade view
    }
}
