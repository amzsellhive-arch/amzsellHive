import {
  ArrowRight, CalendarDays, BarChart3, Target, Users, ShieldCheck, Lock, FileText,
  DollarSign, TrendingUp, Gauge, Settings2, LineChart, Globe, MessageCircle, BadgeCheck,
} from 'lucide-react';
import SiteLayout from '@/components/site/SiteLayout';
import { Container, SectionHeading, YellowButton, OutlineButton, TrustRow, CtaBand, Hl } from '@/components/site/ui';
import LogoCarousel from '@/components/site/LogoCarousel';
import CaseStudyCard from '@/components/site/CaseStudyCard';
import Faq from '@/components/site/Faq';
import FounderCards from '@/components/site/FounderCards';
import { BrandIcon } from '@/components/site/BrandIcons';
import { featuredCaseStudies } from '@/data/caseStudies';
import useSiteSettings from '@/hooks/useSiteSettings';
import useSeo from '@/hooks/useSeo';

const STATS = [
  { icon: CalendarDays, value: '5+ Years', label: 'in Amazon' },
  { icon: BarChart3, value: '$10M+', label: 'Sales Managed' },
  { icon: Target, value: '~5%', label: 'TACOS at Scale' },
  { icon: Users, value: 'Founder-Led', label: 'Management' },
];

const PLATFORMS = [
  { name: 'Amazon', icon: 'amazon' },
  { name: 'Walmart', icon: 'walmart' },
  { name: 'eBay', icon: 'ebay' },
  { name: 'TikTok Shop', icon: 'tiktok' },
  { name: 'Shopify', icon: 'shopify' },
  { name: 'eCommerce Websites', icon: null },
];

const PROOF = [
  { icon: DollarSign, value: '$2,870/mo', label: 'Wasted Spend Found', tone: 'bg-[#FFF1F2] border-[#FBD5DA]', iconBg: 'bg-[#EF4444]' },
  { icon: TrendingUp, value: '+$4,200/mo', label: 'Recoverable Revenue', tone: 'bg-[#EFFAF3] border-[#CDEFD9]', iconBg: 'bg-[#16A34A]' },
  { icon: Gauge, value: '32%', label: 'Your ACOS Ceiling', tone: 'bg-[#FFF8EC] border-[#FBE5BD]', iconBg: 'bg-[#F59E0B]' },
];

const STEPS = [
  { icon: CalendarDays, color: 'bg-brandblue', title: 'Book Strategy Session', text: 'Short call to understand your account and goals.' },
  { icon: FileText, color: 'bg-[#F15A24]', title: 'Audit & Gameplan', text: 'We review your account and share real insights with dollar figures.' },
  { icon: Settings2, color: 'bg-[#16A34A]', title: 'Onboarding & Setup', text: 'Campaign restructuring, negative targeting, and first optimizations.' },
  { icon: LineChart, color: 'bg-[#7C3AED]', title: 'Delivery & Optimization', text: 'Ongoing management reported in profit, with weekly check-ins and monthly strategy calls.' },
];

const WHY = [
  { icon: ShieldCheck, title: 'Proof Before Payment', text: 'Get a free audit with real opportunities and dollar figures.' },
  { icon: BarChart3, title: 'Profit Over Vanity', text: 'We focus on net profit, not just revenue.' },
  { icon: Users, title: 'Honest by Default', text: 'Clear communication and realistic expectations.' },
  { icon: FileText, title: 'No Lock-In', text: 'Month-to-month. No contracts.' },
];

const FAQS = [
  { q: 'Is the audit really free?', a: 'Yes. The audit is 100% free and yours to keep. We’ll review your account and share real, actionable opportunities — no obligation.' },
  { q: 'How much does management cost?', a: 'Pricing is set after the audit based on your goals, account size, and needs. We offer flat fee, performance-based, or hybrid options.' },
  { q: 'What if I already have an agency?', a: 'No problem. We can review your account and provide a free second opinion, even if you’re currently working with another agency.' },
  { q: 'Is there a contract?', a: 'No. We work on a month-to-month basis with no long-term contracts. You’re never locked in.' },
  { q: 'How fast can we start?', a: 'We can usually complete the audit within 48 hours. Once you’re ready to move forward, onboarding and setup typically begin in one week.' },
  { q: 'Who works on my account?', a: 'Your account is managed by our experienced Amazon team. We deliberately keep account management focused so we can maintain hands-on, high-quality management.' },
];

const BRAND_STYLES = [
  'font-extrabold text-[#2F6B3A]',
  'font-semibold tracking-[0.2em] uppercase text-[#3E7C47] text-sm',
  'font-extrabold text-slate-800',
  'font-serif font-semibold text-slate-800 text-xl',
  'font-medium text-[#3A8C8C] uppercase tracking-wider text-sm',
  'font-black uppercase tracking-tight text-slate-900',
  'font-semibold italic text-[#C2418B]',
  'font-bold text-[#7B3FB3]',
  'font-bold uppercase text-[#4D6B2A] text-sm',
];

function BrandItem({ brand, index }) {
  if (brand.logo) {
    return <img src={brand.logo} alt={brand.name} loading="lazy" className="h-10 sm:h-12 w-auto max-w-[150px] object-contain" />;
  }
  return (
    <span className={`whitespace-nowrap text-lg ${BRAND_STYLES[index % BRAND_STYLES.length]}`}>{brand.name}</span>
  );
}

function PlatformItem({ p }) {
  return (
    <span className="flex items-center gap-2.5 whitespace-nowrap">
      {p.icon ? <BrandIcon name={p.icon} size={28} /> : <Globe size={28} className="text-brandblue" aria-hidden="true" />}
      <span className="font-bold text-lg text-slate-800">{p.name}</span>
    </span>
  );
}

export default function HomePage() {
  const { brands } = useSiteSettings();
  useSeo({
    title: 'Founder-Led Amazon Management',
    description:
        'SellHive is a founder-led Amazon growth agency helping brands cut wasted ad spend, improve conversion, and scale profitably through PPC, account management, and data-driven strategy.',
    path: '/',
  });
  const brandIndex = new Map(brands.map((b, i) => [b.name, i]));

  return (
    <SiteLayout>
      {/* 1. Hero */}
      <section className="relative bg-navy-deep text-white overflow-hidden">
        <div className="absolute -top-40 right-0 h-[480px] w-[480px] rounded-full bg-hive/10 blur-3xl" aria-hidden="true" />
        <Container className="relative grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center py-14 sm:py-16 lg:py-20">
          <div>
            <p className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.12em] text-hive mb-4">
              Founder-Led Marketplace Management
            </p>
            <h1 className="font-jakarta text-[2.3rem] sm:text-5xl lg:text-[2.9rem] xl:text-[3.3rem] font-extrabold leading-[1.08] tracking-tight">
              <span className="block">Cut your wasted ad spend.</span>
              <span className="block">Scale <Hl>profitable campaigns.</Hl></span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-white/85 leading-relaxed max-w-xl">
              Managed by an actual Amazon operator, not a design shop. We read your data like someone who’s actually sold on Amazon — because we have.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <YellowButton to="/audit">Get a Free Account Audit</YellowButton>
              <OutlineButton to="/contact" dark icon={MessageCircle}>Talk to Us</OutlineButton>
            </div>
            <TrustRow
              className="mt-8"
              items={[
                { icon: ShieldCheck, label: 'No obligation' },
                { icon: Lock, label: '100% confidential' },
                { icon: BarChart3, label: 'Real account data' },
              ]}
            />
          </div>
          <div className="relative">
            <img
              src="/images/site/home-hero.webp"
              alt="Amazon shipping boxes stacked beside a rising sales chart with ACOS and profit indicators"
              width="762"
              height="476"
              fetchpriority="high"
              className="w-full max-w-[560px] mx-auto rounded-2xl [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]"
            />
          </div>
        </Container>
      </section>

      {/* 2. Trust stats */}
      <section className="bg-mist border-b border-slate-200" aria-label="SellHive at a glance">
        <Container>
          <ul className="grid grid-cols-2 lg:grid-cols-4">
            {STATS.map(({ icon: Icon, value, label }, i) => (
              <li
                key={label}
                className={`flex items-center gap-3 py-6 px-2 sm:px-6 ${i > 0 ? 'lg:border-l border-slate-200' : ''} ${i % 2 === 1 ? 'border-l border-slate-200 lg:border-l' : ''}`}
              >
                <Icon size={30} className="text-brandblue shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-jakarta text-lg sm:text-xl font-extrabold text-navy leading-tight">{value}</div>
                  <div className="text-sm text-slate-500">{label}</div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 3. Brands */}
      <section className="pt-16 pb-8">
        <Container>
          <SectionHeading
            eyebrow="Brands we work with"
            title={<>Trusted by <Hl className="text-[#F5B400]">Amazing Brands.</Hl></>}
            subtitle="We partner with growing Amazon brands across different niches to drive real results."
          />
          <div className="mt-8">
            <LogoCarousel
              label="brands we work with"
              items={brands}
              renderItem={(b) => <BrandItem brand={b} index={brandIndex.get(b.name) ?? 0} />}
            />
          </div>
        </Container>
      </section>

      {/* 4. Platforms */}
      <section className="pt-8 pb-16">
        <Container>
          <SectionHeading
            eyebrow="Marketplaces we help brands grow on"
            title={<>Multi-Channel Marketplace <Hl className="text-[#F5B400]">Expertise.</Hl></>}
            subtitle="We manage and scale brands across all major marketplaces and eCommerce channels."
          />
          <div className="mt-8">
            <LogoCarousel label="marketplaces we work on" items={PLATFORMS} renderItem={(p) => <PlatformItem p={p} />} speed={0.3} />
          </div>
        </Container>
      </section>

      {/* 5. Free audit */}
      <section className="py-16 bg-white border-t border-slate-100">
        <Container className="grid lg:grid-cols-[1fr_1.15fr] gap-10 items-center">
          <div>
            <p className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.12em] text-[#F15A24] mb-2">Free Account Audit</p>
            <h2 className="font-jakarta text-3xl sm:text-4xl lg:text-[2.7rem] font-extrabold text-navy leading-[1.1] tracking-tight">
              See what’s holding your account back.
            </h2>
            <p className="mt-4 text-slate-600 text-lg leading-relaxed max-w-md">
              We’ll review your account and share clear, actionable opportunities to lower ACOS and increase profitable sales.
            </p>
            <div className="mt-7">
              <YellowButton to="/audit">Get Your Free Audit</YellowButton>
            </div>
          </div>
          <ul className="grid sm:grid-cols-3 gap-4">
            {PROOF.map(({ icon: Icon, value, label, tone, iconBg }) => (
              <li key={label} className={`rounded-2xl border ${tone} p-6 text-center`}>
                <span className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full ${iconBg} text-white`}>
                  <Icon size={22} aria-hidden="true" />
                </span>
                <div className="mt-4 font-jakarta text-2xl font-extrabold text-navy">{value}</div>
                <div className="mt-1 text-sm text-slate-600">{label}</div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 6. Proven results */}
      <section className="py-16 bg-mist">
        <Container>
          <SectionHeading
            eyebrow="Proven results"
            title={<>Real Brands. <Hl className="text-[#F5B400]">Real Growth.</Hl></>}
            subtitle="These results are from actual Amazon accounts we’ve managed across different niches and markets."
          />
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCaseStudies.map((s) => (
              <CaseStudyCard key={s.slug} study={s} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <YellowButton to="/results">View All Case Studies</YellowButton>
          </div>
        </Container>
      </section>

      {/* 7. Process */}
      <section className="py-16 bg-white">
        <Container>
          <SectionHeading
            eyebrow="Our process"
            title="Four steps to profitable growth."
            subtitle="A simple, proven process to grow your Amazon business."
          />
          <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {STEPS.map(({ icon: Icon, color, title, text }, i) => (
              <li key={title} className="relative rounded-2xl border border-slate-200 bg-white p-6 pt-8 shadow-[0_6px_24px_-18px_rgba(8,35,63,0.4)]">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full ${color} text-white text-sm font-bold`}>{i + 1}</span>
                  <span className={`flex h-12 w-12 items-center justify-center rounded-full ${color} text-white`}>
                    <Icon size={22} aria-hidden="true" />
                  </span>
                </div>
                <h3 className="font-bold text-lg text-navy">{title}</h3>
                <p className="mt-2 text-slate-600 text-[15px] leading-relaxed">{text}</p>
                {i < STEPS.length - 1 && (
                  <ArrowRight
                    size={22}
                    aria-hidden="true"
                    className="hidden lg:block absolute top-1/2 -right-[1.6rem] -translate-y-1/2 text-brandblue"
                  />
                )}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 8. Why SellHive */}
      <section className="py-16 bg-mist">
        <Container>
          <SectionHeading
            eyebrow="Why SellHive"
            title="A different approach to marketplace management."
            subtitle="We operate like your growth partner, not an agency."
          />
          <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brandblue/10 text-brandblue">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-bold text-navy">{title}</h3>
                  <p className="mt-1 text-slate-600 text-[15px] leading-relaxed">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 9. Founders */}
      <section className="py-16 bg-white" aria-labelledby="founders-heading">
        <Container className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-[#E0A800] mb-2">Meet the founders</p>
            <h2 id="founders-heading" className="font-jakarta text-3xl sm:text-4xl font-extrabold text-navy tracking-tight leading-[1.15]">
              Founder-led. <Hl>Operator-run.</Hl>
            </h2>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              SellHive was founded by Ishfaq Ahmad with co-founder Noman Arshad — two Amazon operators who have worked with multiple brands across global marketplaces. We built SellHive to provide clear strategy, hands-on execution, and practical, results-focused support.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <YellowButton to="/audit">Get a Free Account Audit</YellowButton>
              <OutlineButton to="/about">More About Us</OutlineButton>
            </div>
          </div>
          <FounderCards />
        </Container>
      </section>

      {/* 10. FAQ */}
      <section className="py-16 bg-white border-t border-slate-100">
        <Container>
          <SectionHeading
            eyebrow="FAQ"
            title={<>Questions? <Hl className="text-[#F5B400]">We’ve Got Answers.</Hl></>}
            subtitle="Everything you need to know before you take the next step."
          />
          <div className="mt-10">
            <Faq items={FAQS} />
          </div>
        </Container>
      </section>

      {/* 10. Final CTA */}
      <CtaBand
        eyebrow="Ready to scale your business?"
        title={<>Every month you wait, <Hl>the wasted spend keeps running.</Hl></>}
        body="We’ll show you exactly what your account is losing — in dollars, on your own data — before you spend a cent with us."
        primary={<YellowButton to="/audit">Get a Free Account Audit</YellowButton>}
        secondary={<OutlineButton to="/contact" dark icon={MessageCircle}>Talk to Us</OutlineButton>}
        trust={[
          { icon: BadgeCheck, label: 'Free Audit' },
          { icon: BadgeCheck, label: 'No Contract' },
          { icon: BadgeCheck, label: 'Real Numbers' },
        ]}
      />
    </SiteLayout>
  );
}
