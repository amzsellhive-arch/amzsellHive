import { CalendarDays, BarChart3, Users, Globe, ShieldCheck, FileText, Lock, Box, Image as ImageIcon, Settings } from 'lucide-react';
import SiteLayout from '@/components/site/SiteLayout';
import { Container, Eyebrow, YellowButton, PageHero, Hl } from '@/components/site/ui';
import useSeo from '@/hooks/useSeo';

const FOUNDERS = [
  { name: 'Ishfaq Ahmad', role: 'Co-Founder', img: '/images/team/ishfaq-ahmad.webp' },
  { name: 'Noman Arshad', role: 'Co-Founder', img: '/images/team/noman-arshad.webp' },
];

const EXPERIENCE = [
  { icon: CalendarDays, value: '5+ Years', label: 'Amazon Experience' },
  { icon: BarChart3, value: '$10M+', label: 'Sales Managed' },
  { icon: Users, value: '30+', label: 'Brands & Accounts' },
  { icon: Globe, value: '7', label: 'Marketplaces', sub: 'US, UK, CA, DE, FR, IT, ES' },
];

const WHAT_WE_DO = [
  { icon: BarChart3, title: 'Amazon Advertising', text: 'PPC management, account optimization and performance analysis.' },
  { icon: Box, title: 'Product Research & Sourcing', text: 'Data-driven product research and reliable supplier sourcing.' },
  { icon: ImageIcon, title: 'Listing & Creative', text: 'Listing optimization, A+ content, product images and conversion improvement.' },
  { icon: Settings, title: 'Operations & Account Support', text: 'FBA/FBM operations, inventory planning and ongoing account support.' },
];

export default function AboutPage() {
  useSeo({
    title: 'About SellHive',
    description:
      'SellHive was founded by two Amazon operators. A team of 15 Amazon specialists helping brands scale profitably across 7 marketplaces.',
    image: '/images/site/about-team.webp',
  });

  return (
    <SiteLayout>
      <PageHero
        eyebrow="About SellHive"
        title={<>Built by Amazon Operators. Focused on <Hl>Profitable Growth.</Hl></>}
        body="We’re a team of Amazon specialists helping brands solve real problems, scale profitably, and build a stronger, more valuable business on Amazon."
        image="/images/site/about-hero.webp"
        imageAlt="Amazon boxes and a laptop on a desk in the SellHive office"
        actions={<YellowButton to="/audit">Get a Free Account Audit</YellowButton>}
        trust={[
          { icon: ShieldCheck, label: 'Expert-led analysis' },
          { icon: FileText, label: 'No long-term contract' },
          { icon: Lock, label: '100% confidential' },
        ]}
      />

      {/* Story + founders */}
      <section id="story" className="py-16 bg-white scroll-mt-20">
        <Container className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow tone="yellow" className="!text-[#E0A800] mb-2">Our story</Eyebrow>
            <h2 className="font-jakarta text-3xl sm:text-4xl font-extrabold text-navy tracking-tight leading-[1.15]">
              From Hands-On Experience to a Growth Partner for Brands.
            </h2>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              SellHive was founded by two Amazon operators who have worked with multiple brands across global marketplaces. We’ve seen the challenges that come with growing on Amazon, so we built SellHive to provide clear strategy, hands-on execution, and practical, results-focused support.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-5">
            {FOUNDERS.map((f) => (
              <li key={f.name} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_30px_-20px_rgba(8,35,63,0.45)]">
                <div className="flex aspect-square items-center justify-center bg-gradient-to-b from-navy to-navy-deep">
                  <img src={f.img} alt={`Portrait of ${f.name}, ${f.role} of SellHive`} loading="lazy" className="h-[78%] w-[78%] rounded-full object-cover ring-4 ring-hive/80" />
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-bold text-navy text-lg">{f.name}</h3>
                  <p className="text-[#E0A800] font-semibold text-sm">{f.role}</p>
                  <span className="mt-3 block h-0.5 w-8 bg-hive" aria-hidden="true" />
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Collective experience */}
      <section className="pb-4" aria-labelledby="experience-heading">
        <Container>
          <div className="rounded-2xl bg-mist border border-slate-200 px-6 py-6 grid gap-6 lg:grid-cols-[auto_1fr] items-center">
            <h2 id="experience-heading" className="font-jakarta font-extrabold text-navy uppercase tracking-wider text-sm sm:text-base leading-snug lg:pr-6 lg:border-r border-slate-300">
              Our Collective<br className="hidden lg:block" /> Experience
            </h2>
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {EXPERIENCE.map(({ icon: Icon, value, label, sub }) => (
                <li key={label} className="flex items-center gap-3">
                  <Icon size={34} className="text-[#F5B400] shrink-0" aria-hidden="true" />
                  <div>
                    <div className="font-jakarta text-xl sm:text-2xl font-extrabold text-navy leading-none">{value}</div>
                    <div className="text-sm text-slate-600 mt-1">{label}</div>
                    {sub && <div className="text-[11px] text-slate-500">{sub}</div>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Team */}
      <section id="team" className="py-16 bg-white">
        <Container className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-center">
          <div>
            <Eyebrow tone="yellow" className="!text-[#E0A800] mb-2">Our team</Eyebrow>
            <h2 className="font-jakarta text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">A Team of 15 Amazon Specialists.</h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Our team of 15 dedicated professionals works across strategy, PPC, creative, operations, and account management to deliver real results for our clients.
            </p>
            <div className="mt-7">
              <YellowButton to="/contact">Meet Our Team</YellowButton>
            </div>
          </div>
          <div className="relative">
            <img
              src="/images/site/about-team.webp"
              alt="The SellHive team working at their desks in the office"
              loading="lazy"
              className="w-full rounded-2xl object-cover aspect-[16/9]"
            />
            <div className="absolute bottom-4 right-4 flex items-center gap-3 rounded-xl border border-white/20 bg-navy-deep/90 px-5 py-3 text-white backdrop-blur">
              <span className="font-jakarta text-4xl font-extrabold text-hive leading-none">15</span>
              <span className="leading-tight">
                <span className="block font-bold">Team Members</span>
                <span className="block text-sm text-white/80">Working together for your growth</span>
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* What we do */}
      <section className="py-16 bg-mist">
        <Container>
          <Eyebrow tone="yellow" className="!text-[#E0A800] mb-2">What we do</Eyebrow>
          <h2 className="font-jakarta text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">End-to-End Amazon Growth Support.</h2>
          <p className="mt-3 text-lg text-slate-600">We help brands at every stage of their Amazon journey with practical, results-driven solutions.</p>
          <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHAT_WE_DO.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                <Icon size={34} className="text-[#F5B400] shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="font-bold text-navy">{title}</h3>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="relative bg-navy-deep text-white overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-full md:w-[55%]">
          <img src="/images/site/about-cta.webp" alt="" aria-hidden="true" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/60 to-transparent" />
          <div className="absolute inset-0 bg-navy-deep/60 md:hidden" />
        </div>
        <Container className="relative py-16">
          <Eyebrow tone="yellow" className="mb-2">Let’s grow together</Eyebrow>
          <h2 className="font-jakarta text-3xl sm:text-4xl font-extrabold tracking-tight max-w-xl">
            Ready to Unlock Your Amazon <Hl>Growth</Hl> Potential?
          </h2>
          <p className="mt-3 text-white/85 text-lg">Get a free, no-obligation audit and see where your account can improve.</p>
          <div className="mt-7">
            <YellowButton to="/audit">Get a Free Account Audit</YellowButton>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
