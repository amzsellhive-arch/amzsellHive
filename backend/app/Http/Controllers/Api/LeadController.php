<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLeadRequest;
use App\Mail\ThankYouMail;
use App\Mail\NewLeadNotification;
use App\Models\Lead;
use Illuminate\Support\Facades\Mail;

class LeadController extends Controller
{
    // POST /api/leads (public - contact form)
    public function store(StoreLeadRequest $request)
    {
        $lead = Lead::create($request->validated() + ['status' => 'New']);

        // TODO: send auto-reply to client
        Mail::to($lead->email)->send(new ThankYouMail($lead));

        // TODO: notify admin (email / WhatsApp)
        Mail::to(config('mail.admin_address'))->send(new NewLeadNotification($lead));

        return response()->json(['message' => 'Lead received', 'lead' => $lead], 201);
    }

    // GET /api/admin/leads (protected - admin panel)
    public function index()
    {
        return Lead::latest()->get();
    }

    // PATCH /api/admin/leads/{id} (protected - update status)
    public function updateStatus(Lead $lead)
    {
        // TODO: validate status in [New, Contact, Booking, Client]
    }
}
