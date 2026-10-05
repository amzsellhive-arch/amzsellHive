<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class BlogPostController extends Controller
{
    private const LIST_COLUMNS = [
        'id', 'title', 'slug', 'excerpt', 'cover_image', 'cover_alt', 'category', 'tags',
        'author', 'published_at', 'is_featured', 'reading_minutes',
    ];

    // GET /api/blog?category=&q=&page= (public)
    public function index(Request $request)
    {
        $query = BlogPost::published()->select(self::LIST_COLUMNS);

        if ($category = $request->query('category')) {
            $query->where('category', $category);
        }
        if ($q = trim((string) $request->query('q'))) {
            $query->where(function ($w) use ($q) {
                $w->where('title', 'like', "%{$q}%")
                  ->orWhere('excerpt', 'like', "%{$q}%")
                  ->orWhere('content', 'like', "%{$q}%");
            });
        }

        $posts = $query->orderByDesc('is_featured')
            ->orderByDesc('published_at')
            ->paginate(min((int) $request->query('per_page', 9), 30));

        $categories = BlogPost::published()
            ->whereNotNull('category')
            ->distinct()
            ->orderBy('category')
            ->pluck('category');

        return response()->json([
            'data' => $posts->items(),
            'meta' => [
                'current_page' => $posts->currentPage(),
                'last_page' => $posts->lastPage(),
                'total' => $posts->total(),
            ],
            'categories' => $categories,
        ]);
    }

    // GET /api/blog/{slug} (public)
    public function show(string $slug)
    {
        $post = BlogPost::published()->where('slug', $slug)->firstOrFail();

        $related = BlogPost::published()
            ->select(self::LIST_COLUMNS)
            ->where('id', '!=', $post->id)
            ->when($post->category, fn ($q) => $q->orderByRaw('category = ? desc', [$post->category]))
            ->orderByDesc('published_at')
            ->limit(3)
            ->get();

        return response()->json(['post' => $post, 'related' => $related]);
    }

    // GET /api/admin/blog (protected)
    public function adminIndex()
    {
        return response()->json(
            BlogPost::select(array_merge(self::LIST_COLUMNS, ['status', 'updated_at']))
                ->orderByDesc('updated_at')
                ->get()
        );
    }

    // GET /api/admin/blog/{blogPost} (protected)
    public function adminShow(BlogPost $blogPost)
    {
        return response()->json($blogPost);
    }

    // POST /api/admin/blog (protected)
    public function store(Request $request)
    {
        $data = $this->validated($request);
        $post = BlogPost::create($data);

        return response()->json(['message' => 'Post created', 'post' => $post], 201);
    }

    // PUT /api/admin/blog/{blogPost} (protected)
    public function update(Request $request, BlogPost $blogPost)
    {
        $data = $this->validated($request, $blogPost);
        $blogPost->update($data);

        return response()->json(['message' => 'Post updated', 'post' => $blogPost->fresh()]);
    }

    // DELETE /api/admin/blog/{blogPost} (protected)
    public function destroy(BlogPost $blogPost)
    {
        $blogPost->delete();

        return response()->json(['message' => 'Post deleted']);
    }

    private function validated(Request $request, ?BlogPost $post = null): array
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => ['nullable', 'string', 'max:255', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('blog_posts', 'slug')->ignore($post?->id)],
            'excerpt' => 'nullable|string|max:600',
            'content' => 'nullable|string',
            'cover_image' => 'nullable|string|max:500',
            'cover_alt' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:100',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
            'author' => 'nullable|string|max:120',
            'status' => 'required|in:draft,published',
            'published_at' => 'nullable|date',
            'is_featured' => 'boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:320',
        ], [
            'slug.regex' => 'Slug can only use lowercase letters, numbers and hyphens.',
            'slug.unique' => 'Another post already uses this slug.',
        ]);

        $data['slug'] = !empty($data['slug'])
            ? $data['slug']
            : BlogPost::uniqueSlug($data['title'], $post?->id);

        if ($data['status'] === 'published' && empty($data['published_at'])) {
            $data['published_at'] = $post?->published_at ?? now();
        }

        $data['reading_minutes'] = BlogPost::readingMinutes($data['content'] ?? '');

        return $data;
    }
}
