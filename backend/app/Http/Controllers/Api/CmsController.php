<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Page;

class CmsController extends Controller
{
    // GET /api/pages/{slug} (public - React fetches content to render page)
    public function show(string $slug)
    {
        return Page::where('slug', $slug)->get();
    }

    // PUT /api/admin/pages/{slug}/{sectionKey} (protected - CMS editor)
    public function update(string $slug, string $sectionKey)
    {
        // TODO: update Page content JSON
    }
}
