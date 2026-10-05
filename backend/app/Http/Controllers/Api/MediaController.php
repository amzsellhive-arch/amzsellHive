<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

/**
 * Admin image uploads (blog covers, in-article images, brand logos).
 * Files live in storage/app/uploads and are served through /api/media/*
 * so they work on shared hosting without needing `storage:link`.
 */
class MediaController extends Controller
{
    private function root(): string
    {
        return storage_path('app/uploads');
    }

    // POST /api/admin/media (protected) — multipart field "file"
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpg,jpeg,png,webp,gif|max:5120',
        ], [
            'file.max' => 'Image must be 5 MB or smaller.',
            'file.mimes' => 'Upload a JPG, PNG, WebP or GIF image.',
        ]);

        $file = $request->file('file');
        $dir = now()->format('Y/m');
        $ext = $file->guessExtension() ?: 'jpg'; // from file contents, not the client-supplied name
        $name = Str::uuid()->toString() . '.' . $ext;
        File::ensureDirectoryExists($this->root() . '/' . $dir);
        $file->move($this->root() . '/' . $dir, $name);

        return response()->json([
            'message' => 'Uploaded',
            'url' => '/api/media/' . $dir . '/' . $name,
        ], 201);
    }

    // GET /api/media/{path} (public)
    public function show(string $path)
    {
        if (str_contains($path, '..')) {
            abort(404);
        }
        $full = $this->root() . '/' . $path;
        if (!File::isFile($full)) {
            abort(404);
        }

        return response()->file($full, [
            'Cache-Control' => 'public, max-age=31536000, immutable',
            'X-Content-Type-Options' => 'nosniff',
        ]);
    }
}
