<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

class AdminAuthController extends Controller
{
    // POST /api/admin/login -> returns Sanctum token
    public function login()
    {
        // TODO: validate credentials, issue token
    }

    // POST /api/admin/logout
    public function logout()
    {
        // TODO: revoke token
    }
}
