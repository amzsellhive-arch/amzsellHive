<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    // GET /api/testimonials (public)
    public function index()
    {
        return response()->json(Testimonial::latest()->get());
    }

    // POST /api/admin/testimonials (protected)
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'nullable|in:text,video',
            'content' => 'nullable|string',
            'video_url' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        $testimonial = Testimonial::create($request->all());

        return response()->json(['message' => 'Testimonial created', 'testimonial' => $testimonial], 201);
    }

    // PUT /api/admin/testimonials/{testimonial} (protected)
    public function update(Request $request, Testimonial $testimonial)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'nullable|in:text,video',
            'content' => 'nullable|string',
            'video_url' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        $testimonial->update($request->all());

        return response()->json(['message' => 'Testimonial updated', 'testimonial' => $testimonial]);
    }

    // DELETE /api/admin/testimonials/{testimonial} (protected)
    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();

        return response()->json(['message' => 'Testimonial deleted']);
    }
}
