<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// Repeatable "Before & After / Proven Results" card (Section 4 of homepage brief)
class ResultCard extends Model
{
    protected $fillable = [
        'niche', 'timeframe', 'headline_result', 'description',
        'metric_1', 'metric_2', 'metric_3', 'image',
    ];
}
