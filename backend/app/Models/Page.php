<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// CMS-controlled content per page/section
// e.g. slug="home", section_key="hero", content={"headline": "...", "subtext": "..."}
class Page extends Model
{
    protected $fillable = ['slug', 'section_key', 'content'];

    protected $casts = ['content' => 'array'];
}
