import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABand from '@/components/sections/CTABand';
import { CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Page Hero */}
        <section className="pt-28 pb-16 bg-gradient-to-br from-[hsl(30,20%,98%)] via-white to-[hsl(260,60%,97%)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
<h1 className="text-4xl sm:text-5xl font-extrabold mt-3 mb-5 tracking-tight">
                  The founder runs your account
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  SellHive isn't a call centre with your brand sitting in a queue. You work directly with the operator who built and trained a 40-person Amazon team — not a junior handed your login.
                </p>
              </div>
<div className="card-orbit">
                <div className="card-orbit-inner">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-full bg-[hsl(16,80%,52%)]/10 flex items-center justify-center">
                      <span className="text-[hsl(16,80%,52%)] font-bold text-lg">IA</span>
                    </div>
                    <div>
                      <div className="font-bold">Ishfaq Ahmad</div>
                      <div className="text-sm text-muted-foreground">Founder</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Years in Amazon', value: '5+' },
                      { label: 'Specialized in PPC', value: '4+ years' },
                      { label: 'Team previously led & trained', value: '40+ specialists' },
                      { label: 'Team sales managed', value: '$10M+' },
                      { label: 'TACOS held at scale', value: '~5%' },
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between py-2 border-b border-border last:border-0">
                        <span className="text-sm text-muted-foreground">{row.label}</span>
                        <span className="font-bold text-sm">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <span className="text-[hsl(16,80%,52%)] font-bold text-sm uppercase tracking-wider">The Story</span>
                <h2 className="text-3xl font-extrabold mt-2 mb-5">Why SellHive exists</h2>
                <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                  <p>
                    I've spent five years inside Amazon operations, four of them specializing in advertising. At Rondaful — a global e-commerce and warehousing operator — I ran Group F as Supervisor: a team of 40+ specialists I trained in-house, managing a large multi-SKU catalog across international marketplaces.
                  </p>
                  <p>
                    In one Q4 that group did $652,428 in sales at $97,276 profit with TACOS held near 5% — through a team split, a thousand deleted SPUs and Buy Box losses from auto-pricing.
                  </p>
                  <p>
                    What I kept seeing was the same pattern: brands sold revenue growth that quietly destroyed their margin. Agencies sending sales screenshots while the net number went backwards. SellHive runs the opposite way — every account managed to gross and net profit, with the math shown before anyone is asked to pay.
                  </p>
                </div>
                <div className="mt-6 bg-[hsl(16,90%,97%)] rounded-xl border border-[hsl(16,80%,52%)]/20 p-5">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Founder-led, on purpose.</strong> SellHive today is deliberately small. That means the person who ran a 40-person operation is the one in your campaigns — and it means I take on a limited number of accounts.
                  </p>
                </div>
              </div>

              <div>
                <span className="text-[hsl(16,80%,52%)] font-bold text-sm uppercase tracking-wider">How We Work</span>
                <h2 className="text-3xl font-extrabold mt-2 mb-5">Four principles</h2>
                <div className="space-y-4">
                  {[
                    { title: 'Proof before payment', desc: 'The free audit shows real dollars on your own account before there\'s any conversation about fees.' },
                    { title: 'Profit over vanity', desc: 'We report GP and NP, not just revenue. Growth that costs you margin isn\'t growth.' },
                    { title: 'Honest by default', desc: 'We separate verified results from targets, and we\'ll tell you plainly if your niche can\'t win.' },
                    { title: 'No lock-in', desc: 'Month to month. We keep clients by performance, never by contract length.' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-xl border border-border p-5 card-hover">
                      <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="py-16 bg-[hsl(30,20%,97%)] border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[hsl(16,80%,52%)] font-bold text-sm uppercase tracking-wider">Background</span>
            <h2 className="text-3xl font-extrabold mt-2 mb-8">Experience & Training</h2>
            <div className="grid lg:grid-cols-2 gap-10">
              <div>
                <h3 className="font-bold mb-4">Roles</h3>
                <div className="space-y-3">
                  {[
                    { company: 'Rondaful', role: 'Supervisor, Group F — led and trained 40+ specialists; PPC and budget allocation' },
                    { company: 'NextGen Solutions', role: 'Managing Amazon client accounts, A–Z services' },
                    { company: 'Brandegic', role: 'Growing Amazon account performance' },
                    { company: 'My Amazon Guy (USA)', role: 'Advertising specialist — keyword research, campaign creation, ACOS control' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-xl border border-border p-4">
                      <div className="font-semibold text-sm">{item.company}</div>
                      <div className="text-xs text-muted-foreground mt-1">{item.role}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-4">Certifications</h3>
                <ul className="space-y-2">
                  {[
                    'MAG PPC and MAG SEO certified',
                    'Mina Elias — PPC University',
                    'Amazon Ads Learning Console',
                    'Advanced Private Label training (2024)',
                    'Shark Advertising — RC PPC (2025–2026)',
                    'Best Employee of the Year — Rondaful, 2024',
                  ].map((cert, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 size={15} className="text-[hsl(16,80%,52%)] flex-shrink-0" />
                      {cert}
                    </li>
                  ))}
                </ul>

                <h3 className="font-bold mt-8 mb-3">Channels Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {['Amazon', 'Walmart', 'eBay', 'TikTok Shop'].map((ch, i) => (
                    <span key={i} className="px-3 py-1 bg-[hsl(16,80%,52%)]/10 text-[hsl(16,80%,52%)] text-xs font-bold rounded-full">
                      {ch}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTABand />
      </main>
      <Footer />
    </div>
  );
}
