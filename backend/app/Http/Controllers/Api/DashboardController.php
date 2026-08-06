<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Models\AuditRequest;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
    // GET /api/admin/dashboard (protected)
    public function index()
    {
        $now = Carbon::now();
        $weekAgo = $now->copy()->subDays(7);

        return response()->json([
            'total_leads' => Lead::count(),
            'new_leads' => Lead::where('status', 'New')->count(),
            'leads_this_week' => Lead::where('created_at', '>=', $weekAgo)->count(),
            'total_audits' => AuditRequest::count(),
            'audits_this_week' => AuditRequest::where('created_at', '>=', $weekAgo)->count(),
            'leads_by_status' => Lead::selectRaw('status, count(*) as total')->groupBy('status')->get(),
        ]);
    }
}
