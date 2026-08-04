<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\AuditController;
use App\Http\Controllers\Api\CmsController;
use App\Http\Controllers\Auth\AdminAuthController;

/*
|--------------------------------------------------------------------------
| Public routes (consumed by React forms & pages)
|--------------------------------------------------------------------------
*/
Route::post('/leads', [LeadController::class, 'store']);
Route::post('/audit-requests', [AuditController::class, 'store']);
Route::get('/pages/{slug}', [CmsController::class, 'show']);

Route::post('/admin/login', [AdminAuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Protected admin routes (Sanctum)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::post('/logout', [AdminAuthController::class, 'logout']);

    Route::get('/leads', [LeadController::class, 'index']);
    Route::patch('/leads/{lead}', [LeadController::class, 'updateStatus']);

    Route::get('/audit-requests', [AuditController::class, 'index']);

    Route::put('/pages/{slug}/{sectionKey}', [CmsController::class, 'update']);
});
