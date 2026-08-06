<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAuditRequest;
use App\Mail\ThankYouMail;
use App\Mail\NewLeadNotification;
use App\Models\AuditRequest;
use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class AuditController extends Controller
{
    // POST /api/audit-requests (public - audit.html form)
    public function store(StoreAuditRequest $request)
    {
        $audit = AuditRequest::create($request->validated());

        // Send thank-you + admin notification via a transient Lead for the mail templates
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
