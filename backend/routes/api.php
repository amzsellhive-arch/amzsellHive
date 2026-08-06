<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\AuditController;
use App\Http\Controllers\Api\CmsController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ResultCardController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Auth\AdminAuthController;

/*
|--------------------------------------------------------------------------
| Public routes (consumed by React forms & pages)
|--------------------------------------------------------------------------
*/
Route::post('/leads', [LeadController::class, 'store']);
Route::post('/contact', [ContactController::class, 'store']);
Route::post('/audit-requests', [AuditController::class, 'store']);

Route::get('/pages/{slug}', [CmsController::class, 'show']);
Route::get('/result-cards', [ResultCardController::class, 'index']);
Route::get('/testimonials', [TestimonialController::class, 'index']);

Route::post('/admin/login', [AdminAuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Protected admin routes (Sanctum)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('/me', [AdminAuthController::class, 'me']);
    Route::post('/logout', [AdminAuthController::class, 'logout']);

    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::get('/leads', [LeadController::class, 'index']);
    Route::patch('/leads/{lead}', [LeadController::class, 'updateStatus']);
    Route::delete('/leads/{lead}', [LeadController::class, 'destroy']);

    Route::get('/audit-requests', [AuditController::class, 'index']);
    Route::delete('/audit-requests/{auditRequest}', [AuditController::class, 'destroy']);

    Route::get('/pages', [CmsController::class, 'index']);
    Route::put('/pages/{slug}/{sectionKey}', [CmsController::class, 'update']);
    Route::delete('/pages/{slug}/{sectionKey}', [CmsController::class, 'destroy']);

    Route::post('/result-cards', [ResultCardController::class, 'store']);
    Route::put('/result-cards/{resultCard}', [ResultCardController::class, 'update']);
    Route::delete('/result-cards/{resultCard}', [ResultCardController::class, 'destroy']);

    Route::post('/testimonials', [TestimonialController::class, 'store']);
    Route::put('/testimonials/{testimonial}', [TestimonialController::class, 'update']);
    Route::delete('/testimonials/{testimonial}', [TestimonialController::class, 'destroy']);
});
