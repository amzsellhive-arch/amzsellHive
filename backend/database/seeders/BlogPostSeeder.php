<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use Illuminate\Database\Seeder;

/**
 * Starter articles for the public blog. Safe to re-run: posts are matched
 * by slug and only created if missing (admin edits are never overwritten).
 *
 * php artisan db:seed --class=BlogPostSeeder --force
 */
class BlogPostSeeder extends Seeder
{
    public function run(): void
    {
        foreach ($this->posts() as $i => $post) {
            if (BlogPost::where('slug', $post['slug'])->exists()) {
                continue;
            }

            BlogPost::create(array_merge($post, [
                'status' => 'published',
                'author' => 'SellHive Team',
                'published_at' => now()->subDays(($i + 1) * 3),
                'reading_minutes' => BlogPost::readingMinutes($post['content']),
            ]));
        }
    }

    private function posts(): array
    {
        return [
            [
                'title' => 'How to Lower ACoS Without Killing Your Sales',
                'slug' => 'how-to-lower-acos-without-killing-sales',
                'category' => 'Amazon PPC',
                'tags' => ['ACoS', 'PPC', 'Sponsored Products'],
                'is_featured' => true,
                'cover_image' => '/images/case-studies/beauty-after.webp',
                'cover_alt' => 'Amazon Ads performance chart showing ACoS after optimization',
                'excerpt' => 'Cutting bids across the board lowers ACoS — and sales with it. Here is how to bring ACoS down by fixing where the budget goes instead.',
                'meta_title' => 'How to Lower ACoS Without Killing Sales | SellHive',
                'meta_description' => 'A practical guide to lowering Amazon ACoS by reallocating budget, harvesting search terms and fixing campaign structure — without cutting sales.',
                'content' => <<<'MD'
When ACoS climbs, the first instinct is to cut bids everywhere. ACoS drops — and so do impressions, clicks and sales. A month later the account is "efficient" but smaller.

A better goal is not *less* spend. It is **better-allocated** spend.

## 1. Find where the money is actually going

Pull a search-term report for the last 30–60 days and sort by spend. In most accounts a small group of search terms takes a large share of the budget. Split them into three groups:

- **Converting** — orders at or below your target ACoS.
- **Expensive but converting** — orders, but above target.
- **Spending with no orders** — clicks, no sales.

That third group is where wasted spend hides.

## 2. Cut the waste first — not the winners

Add the non-converting terms as **negative keywords** (exact or phrase) in the campaigns they came from. Do not touch the converting terms yet. This alone often brings ACoS down without losing a single order.

## 3. Harvest what converts

Move converting search terms from auto and broad campaigns into their own **exact-match** campaigns. You get control of the bid for that exact term, and you stop paying broad-match prices for traffic you already know works.

## 4. Adjust bids with data, not by percentage

Instead of "lower everything by 20%", set bids per keyword from its own numbers:

> Target bid ≈ (sales ÷ clicks) × target ACoS

A keyword that earns more per click can carry a higher bid. One that earns less needs a lower one.

## 5. Check placements

Top-of-search, product pages and rest-of-search often perform very differently. If one placement converts well, a placement adjustment can push more budget there instead of raising every bid.

## 6. Shift budget toward proven campaigns

Once waste is cut, move the freed budget to the campaigns with the best results. This is how ACoS goes down **and** sales hold steady.

## The takeaway

Lowering ACoS is an allocation problem. Cut what does not convert, isolate what does, and let the numbers decide bids.

Want to see where your own budget is leaking? [Get a free account audit](/audit) — we will show you in dollars, on your own data.
MD,
            ],
            [
                'title' => 'ACoS vs TACoS: Which Number Tells You If You Are Profitable?',
                'slug' => 'acos-vs-tacos-which-number-matters',
                'category' => 'Amazon PPC',
                'tags' => ['ACoS', 'TACoS', 'Profitability'],
                'is_featured' => false,
                'cover_image' => '/images/case-studies/ppc-sales-growth.webp',
                'cover_alt' => 'Amazon advertising dashboard with spend, sales and ACoS',
                'excerpt' => 'ACoS measures your ads. TACoS measures your business. Here is what each one tells you — and why you should track both.',
                'meta_title' => 'ACoS vs TACoS Explained | SellHive',
                'meta_description' => 'What ACoS and TACoS mean, how to calculate them, and how to use both to judge whether Amazon advertising is growing your business profitably.',
                'content' => <<<'MD'
Two numbers come up in almost every conversation about Amazon advertising: **ACoS** and **TACoS**. They sound similar, but they answer different questions.

## ACoS — how efficient are my ads?

**ACoS (Advertising Cost of Sales)** = ad spend ÷ ad sales × 100

If you spend $500 on ads and those ads bring $2,000 in sales, ACoS is **25%**.

ACoS tells you how much each advertised sale costs. It is the right number for managing campaigns, keywords and bids.

## TACoS — how dependent is my business on ads?

**TACoS (Total Advertising Cost of Sales)** = ad spend ÷ **total** sales × 100

Same $500 ad spend, but total sales (ads + organic) are $8,000. TACoS is **6.25%**.

TACoS tells you how much advertising weighs on your whole business.

## Why you need both

| Situation | ACoS | TACoS | What it means |
|---|---|---|---|
| Ads efficient, organic growing | Stable | Falling | Healthy growth — ads are lifting organic rank |
| Ads efficient, organic flat | Stable | Stable | Ads are not helping organic sales |
| Spending more to hold sales | Rising | Rising | Growing ad dependence — check margins |

A low ACoS can still hide a problem: if TACoS keeps rising, the business is buying more of its sales with ads every month.

## Which target should you set?

Start from margin, not from a benchmark:

- **Break-even ACoS** = profit margin before ad spend. Above it, every ad sale loses money.
- **Target ACoS** sits below break-even, depending on whether the goal is launch, growth or profit.
- **TACoS** is the long-term health check. Falling or stable TACoS while sales grow is the sign that ads are building the business, not just renting sales.

## The takeaway

Use ACoS to manage campaigns. Use TACoS to judge the business. Track both every month.

Not sure what your break-even ACoS should be? [Book a free audit](/audit) and we will work it out from your own numbers.
MD,
            ],
            [
                'title' => 'What We Check First in an Amazon Account Audit',
                'slug' => 'what-we-check-in-an-amazon-account-audit',
                'category' => 'Account Management',
                'tags' => ['Audit', 'Account Health', 'Listings'],
                'is_featured' => false,
                'cover_image' => '/images/site/audit-report.webp',
                'cover_alt' => 'SellHive Amazon audit report on a desk',
                'excerpt' => 'Eight areas we review in every Amazon account audit — from wasted ad spend to listing health — and what each one usually reveals.',
                'meta_title' => 'What We Check in an Amazon Account Audit | SellHive',
                'meta_description' => 'The eight areas SellHive reviews in every free Amazon account audit: ASIN performance, advertising, keywords, listings, profitability, placements, account health and a 30-day plan.',
                'content' => <<<'MD'
A useful audit does not end with "your ACoS is high". It ends with **specific actions and dollar figures**. Here are the eight areas we review in every account — and what each one tends to uncover.

## 1. ASIN performance

Which products drive the business and which hold it back. We look at sales, conversion and ad dependence per ASIN, because one weak product can drag down the whole account's numbers.

## 2. Advertising analysis

Where ad spend goes and what it returns. This is usually where wasted spend shows up first: search terms with clicks and no orders, overlapping campaigns, and budget stuck in low performers.

## 3. Keyword opportunities

Which keywords convert, which are underused, and which are costing money with nothing to show. Converting terms that are not yet in exact-match campaigns are a common quick win.

## 4. Listing health

Titles, bullets, images, A+ content and backend search terms. Ads can only send traffic — the listing has to convert it.

## 5. Profitability

Revenue, margins and a realistic **break-even ACoS** per product. Without this, there is no way to say whether advertising is making or losing money.

## 6. Placements and day-parting

Top-of-search vs product pages vs rest-of-search, and how performance changes by time of day. Small adjustments here can shift budget to where it converts best.

## 7. Account health

Overall performance, policy issues and inventory. Stock-outs and suppressed listings can undo good advertising overnight.

## 8. A 30-day growth plan

Everything above turns into a short, prioritised list: what to fix first, what it should change, and how we will measure it.

## What you get

A clear report with real numbers from your own account — no obligation and no long-term contract.

[Request your free Amazon audit →](/audit)
MD,
            ],
        ];
    }
}
