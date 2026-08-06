<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLeadRequest;
use App\Mail\ThankYouMail;
use App\Mail\NewLeadNotification;
use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class LeadController extends Controller
{
    // POST /api/leads (public - contact form)
    public function store(StoreLeadRequest $request)
    {
        $lead = Lead::create($request->validated() + ['status' => 'New']);

        Mail::to($lead->email)->send(new ThankYouMail($lead));
        Mail::to(config('mail.admin_address'))->send(new NewLeadNotification($lead));

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
