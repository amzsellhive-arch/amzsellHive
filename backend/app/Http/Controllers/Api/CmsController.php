<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;

class CmsController extends Controller
{
    // GET /api/pages/{slug} (public - React fetches content to render page)
    public function show(string $slug)
    {
        $sections = Page::where('slug', $slug)->get();

        return response()->json($sections);
    }

    // GET /api/admin/pages (protected - list all page sections for CMS editor)
    public function index()
    {
        return response()->json(Page::orderBy('slug')->orderBy('section_key')->get());
    }

    // PUT /api/admin/pages/{slug}/{sectionKey} (protected - CMS editor)
    public function update(Request $request, string $slug, string $sectionKey)
    {
        $request->validate([
            'content' => 'required|array',
        ]);

        $page = Page::updateOrCreate(
            ['slug' => $slug, 'section_key' => $sectionKey],
            ['content' => $request->content]
        );

        return response()->json(['message' => 'Section updated', 'page' => $page]);
    }

    // DELETE /api/admin/pages/{slug}/{sectionKey} (protected)
    public function destroy(string $slug, string $sectionKey)
    {
        Page::where('slug', $slug)->where('section_key', $sectionKey)->delete();

        return response()->json(['message' => 'Section deleted']);
    }
}
