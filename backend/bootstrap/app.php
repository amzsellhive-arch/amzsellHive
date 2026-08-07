<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\EnsureAdmin;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        apiPrefix: 'api',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'admin' => EnsureAdmin::class,
        ]);
        // Note: statefulApi() is intentionally NOT used here because the frontend
        // authenticates via Sanctum Bearer tokens (localStorage), not session cookies.
        // statefulApi() would enable CSRF protection on API routes, which causes
        // 419 errors on public POST endpoints like /api/audit-requests since the
        // frontend never fetches an XSRF-TOKEN cookie.
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
