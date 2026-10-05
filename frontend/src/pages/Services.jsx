import {
  BarChart3, Settings, FileText, Search, Image as ImageIcon, CheckCircle2, ShieldCheck, MessageCircle,
  TrendingUp, ShoppingCart, Rocket, ArrowRight, BadgeCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SiteLayout from '@/components/site/SiteLayout';
import { Container, SectionHeading, YellowButton, OutlineButton, PageHero, CtaBand, Hl } from '@/components/site/ui';
import useSeo from '@/hooks/useSeo';

const SERVICES = [
  {
    icon: BarChart3, accent: '#155EEF', tint: 'bg-[#F2F6FE]',
    title: 'Amazon PPC Management', desc: 'Turn ad spend into profitable sales.',
    items: ['Sponsored Products', 'Sponsored Brands', 'Sponsored Display', 'Keyword Research', 'Product Targeting', 'Search-Term Harvesting', 'Bid & Budget Optimization', 'Campaign Restructuring'],
  },
  {
    icon: Settings, accent: '#16A34A', tint: 'bg-[#F1FAF4]',
    title: 'Account Management', desc: 'Keep your entire account moving in the right direction.',
    items: ['Performance Monitoring', 'TACOS Management', 'ASIN-Level Analysis', 'Competitor Analysis', 'Account Health Monitoring', 'Inventory Coordination', 'Strategy & Reporting'],
  },
  {
    icon: FileText, accent: '#F15A24', tint: 'bg-[#FFF5F0]',
    title: 'Listing & Conversion Optimization', desc: 'Get more customers from the traffic you’re already paying for.',
    items: ['Keyword Research', 'Title & Bullet Optimization', 'Backend Search Terms', 'A+ Content Strategy', 'Image Optimization', 'Conversion Analysis', 'Competitor Analysis'],
  },
  {
    icon: Search, accent: '#7C3AED', tint: 'bg-[#F6F2FE]',
    title: 'Product Research & Sourcing', desc: 'Find products with real market potential.',
    items: ['Market Research', 'Keyword Demand Analysis', 'Competitor Analysis', 'Pricing & Profitability', 'Supplier Research', 'MOQ & Cost Analysis', 'Landed Cost Evaluation'],
  },
  {
    icon: ImageIcon, accent: '#E11D48', tint: 'bg-[#FFF2F4]',
    title: 'Creative & Brand Optimization', desc: 'Make your product easier to click, understand, and buy.',
    items: ['Main Image Strategy', 'Infographic Images', 'A+ Content Design', 'Brand Store Strategy', 'CTR-Focused Creative', 'Competitor Creative Analysis', 'Customer Journey'],
  },
];

const OUTCOMES = [
  { icon: BarChart3, color: '#155EEF', tint: 'bg-[#F2F6FE]', title: 'Lower Your ACOS', text: 'Stop paying for traffic that doesn’t convert.' },
  { icon: TrendingUp, color: '#16A34A', tint: 'bg-[#F1FAF4]', title: 'Scale Profitable Campaigns', text: 'Increase investment where the numbers support growth.' },
  { icon: ShoppingCart, color: '#F15A24', tint: 'bg-[#FFF5F0]', title: 'Improve Conversion', text: 'Turn more of your existing traffic into customers.' },
];

const TIERS = [
  {
    tier: 'Tier 1', title: 'Essentials', desc: 'For focused catalogs that need advertising run properly.',
    color: '#155EEF', border: 'border-[#C9D8F5]', btn: 'bg-navy-deep hover:bg-navy text-white',
    items: ['Full PPC management (SP/SB/SD)', 'Search-term harvesting & negatives', 'Placement & bid optimization', 'Weekly + monthly reporting', 'Monthly strategy call'],
  },
  {
    tier: 'Tier 2', title: 'Growth', desc: 'For growing catalogs ready to scale on math.', popular: true,
    color: '#F15A24', border: 'border-[#F15A24]', btn: 'bg-[#F15A24] hover:bg-[#D94A18] text-white',
    items: ['Everything in Essentials', 'Listing & A+ content optimization', 'Keyword isolation & rank tracking', 'TACOS-based scaling & projections', 'Bi-weekly strategy calls'],
  },
  {
    tier: 'Tier 3', title: 'Full Account', desc: 'For larger catalogs that want the whole account handled.',
    color: '#16A34A', border: 'border-[#BFE5CC]', btn: 'bg-navy-deep hover:bg-navy text-white',
    items: ['Everything in Growth', 'Catalog & account health management', 'Creative direction & storefront', 'Inventory & marketplace expansion', 'Weekly strategy calls'],
  },
];

const PROCESS = [
  { icon: Search, color: 'bg-brandblue', title: 'Analyze', text: 'We review your account data and find what’s holding you back.' },
  { icon: Settings, color: 'bg-[#F15A24]', title: 'Fix', text: 'We eliminate wasted spend and improve your campaign structure.' },
  { icon: BarChart3, color: 'bg-[#16A34A]', title: 'Optimize', text: 'We optimize ads, listings and account settings based on real data.' },
  { icon: Rocket, color: 'bg-[#7C3AED]', title: 'Scale', text: 'We increase investment in what works and help you grow profitably.' },
];

export default function ServicesPage() {
  useSeo({
    title: 'Amazon Management Services',
    description:
      'Amazon PPC management, account management, listing optimization, product research and creative — managed around one goal: profitable growth.',
    image: '/images/site/services-hero.webp',
  });

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Services"
        title={<>Amazon Management Built Around <Hl>Profit.</Hl></>}
        body="We manage your Amazon advertising, account, listings, and growth with one goal: profitable growth."
        image="/images/site/services-hero.webp"
        imageAlt="Laptop showing an Amazon sales chart next to an Amazon shipping box"
        actions={
          <>
            <YellowButton to="/audit">Get a Free Account Audit</YellowButton>
            <OutlineButton to="/contact" dark icon={MessageCircle}>Talk to Us</OutlineButton>
          </>
        }
        trust={[
          { icon: ShieldCheck, label: 'Founder-Led' },
          { icon: FileText, label: 'No Contract' },
          { icon: BarChart3, label: 'Real Account Data' },
        ]}
      />

      {/* What we do */}
      <section className="py-16 bg-white">
        <Container>
          <SectionHeading
            eyebrow="Our services"
            title="What We Do"
            subtitle="End-to-end Amazon management to help you spend smarter, convert better, and grow profitably."
          />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SERVICES.map(({ icon: Icon, accent, tint, title, desc, items }) => (
              <article key={title} className={`rounded-2xl border border-slate-200 ${tint} p-5`}>
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: accent }}>
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="font-bold leading-snug" style={{ color: accent }}>{title}</h3>
                </div>
                <p className="mt-4 text-[15px] text-slate-700 leading-snug">{desc}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: accent }} aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Outcomes */}
      <section className="py-16 bg-mist">
        <Container>
          <SectionHeading
            eyebrow="What this means for your business"
            title={<>Three Key Outcomes. <Hl className="text-[#F5B400]">One Goal.</Hl></>}
            subtitle="We focus on what actually drives profit for your Amazon business."
          />
          <ul className="mt-10 grid md:grid-cols-3 gap-5">
            {OUTCOMES.map(({ icon: Icon, color, tint, title, text }) => (
              <li key={title} className={`flex items-center gap-5 rounded-2xl ${tint} border border-white p-6`}>
                <Icon size={44} style={{ color }} aria-hidden="true" className="shrink-0" />
                <div>
                  <h3 className="font-jakarta text-xl font-extrabold" style={{ color }}>{title}</h3>
                  <p className="mt-1 text-slate-600">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Tiers */}
      <section className="py-16 bg-white">
        <Container>
          <SectionHeading
            eyebrow="Engagement tiers"
            title="Three Levels of Support"
            subtitle="Your exact scope and fee are set by what the audit finds — so you’ll never be quoted before we’ve looked."
          />
          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {TIERS.map((t) => (
              <article key={t.title} className={`relative flex flex-col rounded-2xl border-2 ${t.border} bg-white p-7 ${t.popular ? 'shadow-[0_20px_50px_-24px_rgba(241,90,36,0.45)]' : ''}`}>
                {t.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#F15A24] px-3 py-1 text-xs font-bold text-white">
                    Most Popular
                  </span>
                )}
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.tier}</p>
                <h3 className="mt-1 font-jakarta text-2xl font-extrabold text-navy">{t.title}</h3>
                <p className="mt-2 text-slate-600">{t.desc}</p>
                <ul className="mt-5 space-y-2.5 text-[15px] text-slate-700 flex-1">
                  {t.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0" style={{ color: t.color }} aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/audit"
                  className={`mt-7 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-hive ${t.btn}`}
                >
                  Get scoped in your audit <ArrowRight size={16} aria-hidden="true" />
                  <span className="sr-only"> for the {t.title} tier</span>
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="py-16 bg-mist">
        <Container>
          <SectionHeading eyebrow="How it works" title="A Simple Process. Real Results." />
          <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS.map(({ icon: Icon, color, title, text }, i) => (
              <li key={title} className="relative flex gap-4">
                <span className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${color} text-white`}>
                  <Icon size={28} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-bold text-lg text-navy">{i + 1}. {title}</h3>
                  <p className="mt-1 text-[15px] text-slate-600 leading-relaxed">{text}</p>
                </div>
                {i < PROCESS.length - 1 && (
                  <ArrowRight size={20} aria-hidden="true" className="hidden lg:block absolute top-6 -right-6 text-brandblue" />
                )}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand
        title={<>Ready to Find Where <Hl>Your Profit Is Leaking?</Hl></>}
        body="We’ll show you what’s costing your account money — using your own data."
        primary={<YellowButton to="/audit">Get a Free Account Audit</YellowButton>}
        secondary={<OutlineButton to="/contact" dark icon={MessageCircle}>Talk to Us</OutlineButton>}
        trust={[
          { icon: ShieldCheck, label: 'Free Audit' },
          { icon: FileText, label: 'No Contract' },
          { icon: BadgeCheck, label: 'Real Numbers' },
        ]}
      />
    </SiteLayout>
  );
}
