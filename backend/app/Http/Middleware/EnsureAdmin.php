<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureAdmin
{
    public function handle(Request $request, Closure $next)
    {
        // TODO: check $request->user()->role === 'admin'
        return $next($request);
    }
}
