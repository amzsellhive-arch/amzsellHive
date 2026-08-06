<?php

namespace Database\Seeders;

use App\Models\Page;
use App\Models\ResultCard;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        // --- Homepage sections ---
        $homeSections = [
            'hero' => [
                'badge' => 'Founder-Led Amazon Management',
                'headline' => 'Cut your wasted ad spend and scale profitable campaigns',
                'highlight' => 'profitable campaigns',
                'subtext' => 'Managed by an actual Amazon operator, not a design shop. We read your data like someone who\'s actually sold on Amazon — because we have.',
                'cta_primary' => 'Book a Free Strategy Call',
                'cta_secondary' => 'See Our Results',
                'stats' => [
                    ['value' => '5+', 'label' => 'Years in Amazon'],
                    ['value' => '$10M+', 'label' => 'Sales Managed'],
                    ['value' => '~5%', 'label' => 'TACOS at Scale'],
                ],
            ],
            'trustbar' => [
                'title' => 'Trusted by sellers across US, UK & EU marketplaces',
            ],
            'results' => [
                'badge' => 'Proven Results',
                'title' => 'Real accounts. Real numbers.',
                'subtext' => 'Every figure is backable on request. Where something is a target rather than achieved, we say so.',
            ],
            'testimonials' => [
                'badge' => 'Testimonials',
                'title' => 'What sellers say',
                'subtext' => 'Real feedback from real accounts. No actors, no scripts.',
            ],
            'services' => [
                'badge' => 'Services',
                'title' => 'Everything your Amazon account needs, run to profit',
            ],
            'cta' => [
                'title' => 'Ready to stop leaking money?',
                'subtext' => 'Start with the free audit — real findings, no obligation.',
                'button' => 'Show me what my account is leaking',
            ],
            'faq' => [
                'title' => 'Frequently asked questions',
                'subtext' => 'The answers to the questions we hear most.',
            ],
        ];

        foreach ($homeSections as $key => $content) {
            Page::updateOrCreate(
                ['slug' => 'home', 'section_key' => $key],
                ['content' => $content]
            );
        }

        // --- Services page ---
        Page::updateOrCreate(
            ['slug' => 'services', 'section_key' => 'hero'],
            ['content' => [
                'badge' => 'Services',
                'headline' => 'Everything your Amazon account needs, run to profit',
                'subtext' => 'Four service pillars, three ways to structure the fee, and no contract. Every engagement starts with a free audit.',
                'button' => 'Show me what my account is leaking',
            ]]
        );

        // --- About page ---
        Page::updateOrCreate(
            ['slug' => 'about', 'section_key' => 'hero'],
            ['content' => [
                'badge' => 'About',
                'headline' => 'Founder-led Amazon management',
                'subtext' => 'The story behind SellHive and the person who runs it.',
            ]]
        );

        // --- Contact page ---
        Page::updateOrCreate(
            ['slug' => 'contact', 'section_key' => 'hero'],
            ['content' => [
                'badge' => 'Contact',
                'headline' => 'Talk to the person who\'ll run your account',
                'subtext' => 'No sales team, no gatekeeper. Messages come straight to Ishfaq, and you\'ll get a reply within one business day.',
            ]]
        );

        // --- Audit page ---
        Page::updateOrCreate(
            ['slug' => 'audit', 'section_key' => 'hero'],
            ['content' => [
                'badge' => 'Free Account Audit',
                'headline' => 'Find out what your account is leaking',
                'subtext' => 'A real teardown of your advertising and listings, with a dollar figure attached to every finding. No cost, no obligation.',
            ]]
        );

        // --- Result cards ---
        $resultCards = [
            [
                'niche' => 'Personal Care',
                'timeframe' => '90 days',
                'headline_result' => '49% Net Proceeds',
                'description' => '$8,706 in sales returning $4,267 net in the account\'s best period.',
                'metric_1' => 'Net Margin|49%',
                'metric_2' => 'TACOS|7.6%',
                'metric_3' => 'Organic|88%',
            ],
            [
                'niche' => 'Verified Brand',
                'timeframe' => '30 days',
                'headline_result' => '$2,870 Recovered',
                'description' => '$25,467 in sales at 27.2% net margin, up 15.9% MoM.',
                'metric_1' => 'Net Margin|27.2%',
                'metric_2' => 'Growth|+15.9%',
                'metric_3' => 'Recovered|$2,870',
            ],
            [
                'niche' => 'Home & Kitchen',
                'timeframe' => '14 days',
                'headline_result' => '110% ACOS → Fixed',
                'description' => 'A bleeding product diagnosed and kept net positive.',
                'metric_1' => 'Before|110%',
                'metric_2' => 'Saved|+$842',
                'metric_3' => 'Status|Fixed',
            ],
        ];

        foreach ($resultCards as $card) {
            ResultCard::updateOrCreate(
                ['niche' => $card['niche'], 'headline_result' => $card['headline_result']],
                $card
            );
        }

        // --- Testimonials ---
        $testimonials = [
            [
                'name' => 'Sarah M.',
                'type' => 'text',
                'content' => 'Ishfaq found $2,870 in wasted spend we didn\'t even know existed. Within 30 days our net margin jumped to 27.2%.',
            ],
            [
                'name' => 'James K.',
                'type' => 'text',
                'content' => 'Our ACOS was at 110% on one product. SellHive turned it net positive in two weeks.',
            ],
            [
                'name' => 'Ahmed R.',
                'type' => 'text',
                'content' => 'Finally an agency that reports in profit, not just revenue. Our TACOS went from 18% to under 8%.',
            ],
        ];

        foreach ($testimonials as $t) {
            Testimonial::updateOrCreate(
                ['name' => $t['name']],
                $t
            );
        }
    }
}
