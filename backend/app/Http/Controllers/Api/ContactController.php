<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLeadRequest;
use App\Mail\ThankYouMail;
use App\Mail\NewLeadNotification;
use App\Models\Lead;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    // POST /api/contact - reuses the Lead flow with the topic field
    public function store(StoreLeadRequest $request)
    {
        $lead = Lead::create($request->validated() + ['status' => 'New']);

        Mail::to($lead->email)->send(new ThankYouMail($lead));
        Mail::to(config('mail.admin_address'))->send(new NewLeadNotification($lead));

        return response()->json(['message' => 'Message received', 'lead' => $lead], 201);
    }
}
