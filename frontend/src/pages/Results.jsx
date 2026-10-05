import SiteLayout from '@/components/site/SiteLayout';
import { Container, YellowButton, PageHero, CtaBand, Hl } from '@/components/site/ui';
import CaseStudyCard from '@/components/site/CaseStudyCard';
import { caseStudies } from '@/data/caseStudies';
import useSeo from '@/hooks/useSeo';

export default function ResultsPage() {
  useSeo({
    title: 'Amazon Case Studies & Results',
    description:
      'Real results from Amazon brands we have managed — PPC optimization, Brand Store performance, Q4 sales and account growth, backed by original Seller Central data.',
    image: '/images/site/results-hero.webp',
  });

  return (
    <SiteLayout>
      <PageHero
        compact
        title={<>Amazon Accounts. <Hl>Higher Profitability.</Hl></>}
        body="Real results from Amazon brands we have managed. Different niches. Different markets. Measurable growth."
        image="/images/site/results-hero.webp"
        imageAlt="Amazon boxes stacked next to a rising yellow growth arrow"
      />

      <section className="py-14 sm:py-16 bg-mist">
        <Container>
          <h2 className="font-jakarta text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Account <Hl className="text-[#F5B400]">Results</Hl>
          </h2>
          <p className="mt-2 text-lg text-brandblue/90">
            Real performance from Amazon accounts we’ve managed across different categories and markets.
          </p>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((s) => (
              <CaseStudyCard key={s.slug} study={s} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        eyebrow="Ready to improve your Amazon account?"
        title={<>Get a Free <Hl>Amazon Account Audit</Hl></>}
        body="We’ll review your account and share actionable opportunities to lower ACoS and increase profitable sales."
        primary={<YellowButton to="/audit">Get Started Now</YellowButton>}
      />
    </SiteLayout>
  );
}
