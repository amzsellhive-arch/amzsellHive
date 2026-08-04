<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditRequest extends Model
{
    protected $fillable = [
        'name', 'brand', 'email', 'revenue_range', 'marketplace', 'problem',
    ];
}
