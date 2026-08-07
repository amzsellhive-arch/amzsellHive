<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAuditRequest;
use App\Mail\ThankYouMail;
use App\Mail\NewLeadNotification;
use App\Models\AuditRequest;
use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class AuditController extends Controller
{
    // POST /api/audit-requests (public - audit.html form)
    public function store(StoreAuditRequest $request)
    {
        // Save the DB row first — this is the critical operation.
        $audit = AuditRequest::create($request->validated());

        // Send thank-you + admin notification via a transient Lead for the mail templates.
        // Emails are wrapped in try/catch so a mail failure NEVER returns an error to the
        // client — the DB entry is already saved, and the client should always see the
        // success/thank-you message.
        try {
            $lead = new Lead([
                'name' => $audit->name,
                'email' => $audit->email,
                'brand' => $audit->brand,
                'message' => 'Audit request: ' . $audit->problem,
                'service_interest' => 'Free Account Audit',
            ]);
            $lead->status = 'New';

            Mail::to($audit->email)->send(new ThankYouMail($lead));
            Mail::to(config('mail.admin_address'))->send(new NewLeadNotification($lead));
        } catch (\Throwable $e) {
            // Log the mail failure but still return success to the client.
            Log::error('Audit notification email failed: ' . $e->getMessage(), [
                'audit_id' => $audit->id,
                'email' => $audit->email,
            ]);
        }

        return response()->json(['message' => 'Audit request received', 'audit' => $audit], 201);
    }

    // GET /api/admin/audit-requests (protected)
    public function index()
    {
        return response()->json(AuditRequest::latest()->get());
    }

    // DELETE /api/admin/audit-requests/{auditRequest} (protected)
    public function destroy(AuditRequest $auditRequest)
    {
        $auditRequest->delete();

        return response()->json(['message' => 'Audit request deleted']);
    }
}
