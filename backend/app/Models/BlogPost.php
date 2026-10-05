<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class BlogPost extends Model
{
    protected $fillable = [
        'title', 'slug', 'excerpt', 'content', 'cover_image', 'cover_alt', 'category',
        'tags', 'author', 'status', 'published_at', 'is_featured', 'meta_title',
        'meta_description', 'reading_minutes',
    ];

    protected $casts = [
        'tags' => 'array',
        'published_at' => 'datetime',
        'is_featured' => 'boolean',
        'reading_minutes' => 'integer',
    ];

    /** Only posts that are live on the public site. */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    /** Make a unique slug from the given text, ignoring $ignoreId. */
    public static function uniqueSlug(string $text, ?int $ignoreId = null): string
    {
        $base = Str::slug($text) ?: 'post';
        $slug = $base;
        $i = 2;
        while (static::where('slug', $slug)->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))->exists()) {
            $slug = $base . '-' . $i++;
        }
        return $slug;
    }

    public static function readingMinutes(?string $markdown): int
    {
        $words = str_word_count(strip_tags((string) $markdown));
        return max(1, (int) ceil($words / 220));
    }
}
