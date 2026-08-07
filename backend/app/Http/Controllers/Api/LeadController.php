<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLeadRequest;
use App\Mail\ThankYouMail;
use App\Mail\NewLeadNotification;
use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class LeadController extends Controller
{
    // POST /api/leads (public - contact form)
    public function store(StoreLeadRequest $request)
    {
        $data = $request->validated();

        // The contact form sends "topic"; persist it into service_interest
        // so the selection shows up in the admin leads table.
        if (empty($data['service_interest']) && !empty($data['topic'])) {
            $data['service_interest'] = $data['topic'];
        }
        unset($data['topic']);

        // Save the DB row first — this is the critical operation.
        $lead = Lead::create($data + ['status' => 'New']);

        // Emails are wrapped in try/catch so a mail failure never breaks the
        // client-facing success message.
        try {
            Mail::to($lead->email)->send(new ThankYouMail($lead));
            Mail::to(config('mail.admin_address'))->send(new NewLeadNotification($lead));
        } catch (\Throwable $e) {
            Log::error('Lead notification email failed: ' . $e->getMessage(), [
                'lead_id' => $lead->id,
                'email' => $lead->email,
            ]);
        }

        return response()->json(['message' => 'Lead received', 'lead' => $lead], 201);
    }

    // GET /api/admin/leads (protected - admin panel)
    public function index()
    {
        return response()->json(Lead::latest()->get());
    }

    // PATCH /api/admin/leads/{lead} (protected - update status)
    public function updateStatus(Request $request, Lead $lead)
    {
        $request->validate([
            'status' => 'required|in:New,Contact,Booking,Client',
        ]);

        $lead->update(['status' => $request->status]);

        return response()->json(['message' => 'Status updated', 'lead' => $lead]);
    }

    // DELETE /api/admin/leads/{lead} (protected)
    public function destroy(Lead $lead)
    {
        $lead->delete();

        return response()->json(['message' => 'Lead deleted']);
    }
}
