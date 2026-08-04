<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAuditRequest;
use App\Models\AuditRequest;

class AuditController extends Controller
{
    // POST /api/audit-requests (public - audit.html form)
    public function store(StoreAuditRequest $request)
    {
        $audit = AuditRequest::create($request->validated());

        // TODO: thank-you email + admin notification (same pattern as LeadController)

        return response()->json(['message' => 'Audit request received', 'audit' => $audit], 201);
    }

    // GET /api/admin/audit-requests (protected)
    public function index()
    {
        return AuditRequest::latest()->get();
    }
}
