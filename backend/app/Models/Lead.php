<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    protected $fillable = [
        'name', 'email', 'brand', 'phone',
        'service_interest', 'products_count', 'asin_url',
        'budget_range', 'message', 'status', // New | Contact | Booking | Client
    ];
}
