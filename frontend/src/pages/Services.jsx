import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABand from '@/components/sections/CTABand';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Search, Settings, TrendingUp, Users, CheckCircle2 } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Page Hero */}
        <section className="pt-28 pb-16 bg-gradient-to-br from-[hsl(30,20%,98%)] via-white to-[hsl(260,60%,97%)]">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-5 tracking-tight max-w-3xl mx-auto">
              Everything your Amazon account needs, run to profit
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Four service pillars, three ways to structure the fee, and no contract. Every engagement starts with a free audit.
            </p>
            <Link to="/audit">
              <Button className="btn-glow btn-pulse bg-[hsl(16,80%,52%)] hover:bg-[hsl(16,80%,45%)] text-white font-bold px-8 py-6 text-base rounded-full">
                Show me what my account is leaking
              </Button>
            </Link>
          </div>
        </section>

        {/* Pillar 1 */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[hsl(16,80%,52%)] font-bold text-sm uppercase tracking-wider">Pillar 1</span>
            <h2 className="text-3xl font-extrabold mt-2 mb-4">Manage — advertising, run properly</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-3xl">
              Day-to-day management of your full advertising account, reported in the metrics that decide whether you actually made money.
            </p>
<div className="grid md:grid-cols-2 gap-6">
              {[
                'Sponsored Products, Brands, Video & Display',
                'Search-term harvesting on a three-pass review cycle',
                'Negative targeting to stop spend on non-converting terms',
                'Placement and bid optimization',
                'Campaign restructuring into single-product campaigns',
                'Day-parting around hours that produce orders',
                'Weekly and monthly reporting: Sales, ACOS, TACOS, GP & NP',
                'Proactive alerts — you hear about problems from us first',
              ].map((item, i) => (
                <div key={i} className="card-orbit">
                  <div className="card-orbit-inner">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-[hsl(16,80%,52%)] mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pillar 2 */}
        <section className="py-16 bg-[hsl(30,20%,97%)] border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[hsl(16,80%,52%)] font-bold text-sm uppercase tracking-wider">Pillar 2</span>
            <h2 className="text-3xl font-extrabold mt-2 mb-4">Audit — the diagnosis everything is built on</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-3xl">
              Our audit isn't a generic PDF. It's a teardown of your account with a dollar figure attached to every finding.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Search, title: 'ASIN Grades', desc: 'Every product sorted A/B/C/Cut with its share of total ad spend.' },
                { icon: TrendingUp, title: 'Wasted Spend in Dollars', desc: 'The recoverable number per month, plus your top three bleeders.' },
                { icon: Settings, title: 'Your ACOS Ceiling', desc: 'Maximum profitable ranking ACOS, calculated from your own margin.' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-border p-7 card-hover">
                  <item.icon size={24} className="text-[hsl(260,60%,55%)] mb-4" />
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pillar 3 */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[hsl(16,80%,52%)] font-bold text-sm uppercase tracking-wider">Pillar 3</span>
            <h2 className="text-3xl font-extrabold mt-2 mb-4">Scale — growth with a ceiling, not a guess</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-3xl">
              Most agencies scale by adding budget. We scale by setting a limit and staying under it.
            </p>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="bg-white rounded-2xl border border-border p-7">
                <h3 className="font-bold mb-4 text-sm text-muted-foreground uppercase tracking-wider">How the ceiling is set</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border"><span className="text-sm">Your TACOS limit</span><span className="font-bold text-[hsl(16,80%,52%)]">18%</span></div>
                  <div className="flex justify-between py-2 border-b border-border"><span className="text-sm">Current monthly revenue</span><span className="font-bold">$25,467</span></div>
                  <div className="flex justify-between py-2"><span className="text-sm font-semibold">Monthly spend ceiling</span><span className="font-bold text-[hsl(16,80%,52%)]">$4,584</span></div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  'Recovered waste reinvested into higher-potential targets first',
                  'Growth projections built off comparable ASINs we reverse-engineer',
                  'Scenarios modelled — realistic target vs stretch goal',
                  'Want it faster? We show the margin trade-off in numbers before you decide',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[hsl(16,80%,52%)] mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pillar 4 */}
        <section className="py-16 bg-[hsl(30,20%,97%)] border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[hsl(16,80%,52%)] font-bold text-sm uppercase tracking-wider">Pillar 4</span>
            <h2 className="text-3xl font-extrabold mt-2 mb-4">Grow & Retain — the part most agencies skip</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-3xl">
              Signed isn't safe. Retention comes from you seeing the work, not hearing about it.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Users, title: 'Proactive Comms', desc: 'Issues reach you with proof, impact and a revised plan attached.' },
                { icon: Settings, title: 'Meeting Rhythm', desc: 'Strategy call every 1-2 weeks, with every agreement documented.' },
                { icon: TrendingUp, title: 'Listing & Creative', desc: 'A+ content, images and copy — no bid fixes a 4% conversion listing.' },
                { icon: Search, title: 'Expansion', desc: 'New SKUs, new ad types, new marketplaces once the core is healthy.' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-border p-6 card-hover">
                  <item.icon size={22} className="text-[hsl(260,60%,55%)] mb-3" />
                  <h3 className="font-bold text-sm mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Engagement Tiers */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[hsl(16,80%,52%)] font-bold text-sm uppercase tracking-wider">Engagement Tiers</span>
              <h2 className="text-3xl font-extrabold mt-2 mb-4">Three levels of support</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Your exact scope and fee are set by what the audit finds — so you'll never be quoted before we've looked.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  flag: 'Tier 1',
                  name: 'Essentials',
                  who: 'For focused catalogs that need advertising run properly',
                  features: ['Full PPC management (SP/SB/SD)', 'Search-term harvesting & negatives', 'Placement & bid optimization', 'Weekly + monthly reporting', 'Monthly strategy call'],
                  featured: false,
                },
                {
                  flag: 'Tier 2 · Most Popular',
                  name: 'Growth',
                  who: 'For growing catalogs ready to scale on math',
                  features: ['Everything in Essentials', 'Listing & A+ content optimization', 'Keyword isolation & rank tracking', 'TACOS-based scaling & projections', 'Bi-weekly strategy calls'],
                  featured: true,
                },
                {
                  flag: 'Tier 3',
                  name: 'Full Account',
                  who: 'For larger catalogs that want the whole account handled',
                  features: ['Everything in Growth', 'Catalog & account health management', 'Creative direction & storefront', 'Inventory & marketplace expansion', 'Weekly strategy calls'],
                  featured: false,
                },
              ].map((tier, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border p-7 flex flex-col ${
                    tier.featured
                      ? 'border-[hsl(16,80%,52%)] bg-[hsl(16,90%,97%)] shadow-lg relative'
                      : 'border-border bg-white'
                  }`}
                >
                  {tier.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[hsl(16,80%,52%)] text-white text-xs font-bold rounded-full">
                      Most Popular
                    </div>
                  )}
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{tier.flag}</span>
                  <h3 className="text-2xl font-extrabold mt-2 mb-2">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground mb-5">{tier.who}</p>
                  <ul className="space-y-3 flex-1">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 size={15} className="text-[hsl(16,80%,52%)] mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/audit" className="mt-6">
                    <Button
                      className={`w-full rounded-full font-semibold ${
                        tier.featured
                          ? 'btn-glow bg-[hsl(16,80%,52%)] hover:bg-[hsl(16,80%,45%)] text-white'
                          : 'bg-foreground hover:bg-foreground/90 text-white'
                      }`}
                    >
                      Get scoped in your audit
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTABand />
      </main>
      <Footer />
    </div>
  );
}
