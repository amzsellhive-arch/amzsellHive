import { Link, useParams } from 'react-router-dom';
import { Home, ChevronRight, ArrowLeft, CheckCircle2, Lightbulb } from 'lucide-react';
import SiteLayout from '@/components/site/SiteLayout';
import { Container, YellowButton, CtaBand, Hl } from '@/components/site/ui';
import { getCaseStudy, CASE_STUDY_FOOTER_TEXT } from '@/data/caseStudies';
import useSeo from '@/hooks/useSeo';
import NotFound from './NotFound';

function H2({ children }) {
  return <h2 className="font-jakarta text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">{children}</h2>;
}

function List({ items }) {
  return (
    <ul className="mt-4 space-y-2.5 text-slate-700">
      {items.map((it) => (
        <li key={it} className="flex gap-2.5">
          <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-brandblue" aria-hidden="true" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Screenshot({ shot }) {
  const tone =
    shot.variant === 'before'
      ? { wrap: 'bg-[#FFF3F4] border-[#FAD4D8]', head: 'text-[#DC2626]', badge: 'bg-[#FBD5DA] text-[#B91C1C]' }
      : shot.variant === 'after'
        ? { wrap: 'bg-[#EFFAF3] border-[#C8EDD5]', head: 'text-[#15803D]', badge: 'bg-[#C8EDD5] text-[#166534]' }
        : null;

  if (tone) {
    return (
      <figure className={`rounded-2xl border ${tone.wrap} p-4 sm:p-6`}>
        <figcaption className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="flex flex-wrap items-baseline gap-x-3">
            <span className={`font-jakarta text-xl sm:text-2xl font-extrabold ${tone.head}`}>{shot.heading}</span>
            <span className="text-slate-700">{shot.period}</span>
          </span>
          <span className={`rounded-lg px-3 py-1.5 text-sm font-bold ${tone.badge}`}>{shot.badge}</span>
        </figcaption>
        <img src={shot.src} alt={shot.alt} loading="lazy" className="w-full rounded-lg border border-slate-200 bg-white" />
        <p className="mt-3 text-sm text-slate-600">{shot.metrics}</p>
      </figure>
    );
  }

  return (
    <figure>
      <H2>{shot.heading}</H2>
      <figcaption className="mt-2 text-slate-600">{shot.caption}</figcaption>
      <a href={shot.src} target="_blank" rel="noopener noreferrer" className="mt-5 block rounded-2xl border border-slate-200 bg-white p-2 sm:p-3 shadow-[0_10px_30px_-20px_rgba(8,35,63,0.5)]">
        <img src={shot.src} alt={shot.alt} loading="lazy" className="w-full rounded-lg" />
        <span className="sr-only">Open full-size screenshot</span>
      </a>
    </figure>
  );
}

export default function CaseStudyPage() {
  const { slug } = useParams();
  const cs = getCaseStudy(slug);

  useSeo(
    cs
      ? {
          title: `${cs.titleLead} ${cs.titleAccent} — Case Study`,
          description: cs.subtitle,
          image: cs.card.image,
        }
      : { title: 'Case study not found' }
  );

  if (!cs) return <NotFound />;

  return (
    <SiteLayout>
      <article>
        <Container className="pt-8 pb-14">
          <nav aria-label="Breadcrumb" className="text-sm text-brandblue">
            <ol className="flex items-center gap-1.5 flex-wrap">
              <li>
                <Link to="/" className="flex items-center hover:underline" aria-label="Home">
                  <Home size={15} />
                </Link>
              </li>
              <ChevronRight size={14} className="text-slate-400" aria-hidden="true" />
              <li><Link to="/results" className="hover:underline">Results</Link></li>
              <ChevronRight size={14} className="text-slate-400" aria-hidden="true" />
              <li aria-current="page" className="text-slate-600">{cs.titleLead} {cs.titleAccent}</li>
            </ol>
          </nav>

          <header className="mt-5 max-w-4xl">
            <h1 className="font-jakarta text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight leading-[1.08] text-navy">
              {cs.titleLead} <Hl className="text-[#F5B400]">{cs.titleAccent}</Hl>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-600 leading-relaxed">{cs.subtitle}</p>
          </header>

          <section className="mt-12 max-w-4xl">
            <H2>The Problem</H2>
            <p className="mt-3 text-slate-700 leading-relaxed text-[17px]">{cs.problem}</p>
          </section>

          <section className="mt-12 space-y-6" aria-label="Account data">
            {cs.screenshots.map((s) => (
              <Screenshot key={s.src} shot={s} />
            ))}
          </section>

          <div className="mt-12 grid lg:grid-cols-2 gap-10">
            <section>
              <H2>Key Results</H2>
              <p className="mt-2 text-slate-600">{cs.keyResultsIntro}</p>
              <List items={cs.keyResults} />
            </section>
            <section>
              <H2>What We Did</H2>
              <p className="mt-2 text-slate-600">{cs.whatWeDidIntro}</p>
              <List items={cs.actions} />
            </section>
          </div>

          {cs.products && (
            <section className="mt-12">
              <H2>Top Performing Products</H2>
              <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-[15px]">
                  <thead className="bg-mist text-navy">
                    <tr>
                      {['Product', 'ACoS', 'Sales', 'Orders', 'ROAS'].map((h) => (
                        <th key={h} scope="col" className="px-5 py-3 font-bold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {cs.products.map((p) => (
                      <tr key={p.name} className="border-t border-slate-200">
                        <th scope="row" className="px-5 py-3 font-semibold text-navy">{p.name}</th>
                        <td className="px-5 py-3">{p.acos}</td>
                        <td className="px-5 py-3">{p.sales}</td>
                        <td className="px-5 py-3">{p.orders}</td>
                        <td className="px-5 py-3">{p.roas}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {cs.comparison && (
            <section className="mt-12">
              <H2>{cs.comparison.heading}</H2>
              <ul className="mt-5 grid sm:grid-cols-3 gap-4">
                {cs.comparison.rows.map((r) => (
                  <li key={r.label} className="rounded-2xl border border-slate-200 bg-mist p-5">
                    <p className="text-sm font-semibold text-slate-500">{r.label}</p>
                    <p className="mt-1 font-jakarta text-2xl font-extrabold text-navy">{r.value}</p>
                    <p className="mt-1 text-sm text-slate-600">{r.note}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-slate-500">{cs.comparison.note}</p>
            </section>
          )}

          {cs.journey && (
            <section className="mt-12">
              <H2>{cs.journey.heading}</H2>
              <p className="mt-2 text-slate-600">{cs.journey.intro}</p>
              <ol className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cs.journey.steps.map((s, i) => (
                  <li key={s.title} className="rounded-2xl border border-slate-200 p-5">
                    <span className="text-sm font-bold text-brandblue">Step {i + 1}</span>
                    <p className="mt-1 font-bold text-navy text-lg">{s.title}</p>
                    <p className="mt-1 text-slate-600">{s.text}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {cs.insight && (
            <aside className="mt-12 flex gap-4 rounded-2xl border border-hive/50 bg-hive-light/60 p-6">
              <Lightbulb size={28} className="shrink-0 text-[#D99A00]" aria-hidden="true" />
              <div>
                <p className="font-bold text-navy">Key Insight</p>
                <p className="mt-1 font-jakarta text-lg font-extrabold text-navy">{cs.insight.text}</p>
                {cs.insight.supporting && <p className="mt-2 text-slate-700">{cs.insight.supporting}</p>}
              </div>
            </aside>
          )}

          <section className="mt-12 max-w-4xl">
            <H2>The Outcome</H2>
            <p className="mt-3 text-slate-700 leading-relaxed text-[17px]">{cs.outcome}</p>
            {cs.coreMessage && (
              <blockquote className="mt-6 border-l-4 border-hive pl-5 font-jakarta text-xl font-bold text-navy">
                {cs.coreMessage}
              </blockquote>
            )}
          </section>

          <Link
            to="/results"
            className="mt-10 inline-flex items-center gap-2 rounded-lg border-2 border-brandblue/70 px-5 py-2.5 font-bold text-brandblue hover:bg-brandblue hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandblue focus-visible:ring-offset-2"
          >
            <ArrowLeft size={17} aria-hidden="true" /> Back to Results
          </Link>
        </Container>
      </article>

      <CtaBand
        eyebrow="Ready to improve your Amazon account?"
        title={<>Get a Free <Hl>Amazon Account Audit</Hl></>}
        body={cs.footerText || CASE_STUDY_FOOTER_TEXT}
        primary={<YellowButton to="/audit">Get Started Now</YellowButton>}
      />
    </SiteLayout>
  );
}
