import { useState } from 'react';
import {
  ArrowRight, ShieldCheck, Lightbulb, Lock, BarChart3, TrendingUp, Target, Tag, Database, Search,
  FileText, PieChart, Megaphone, Activity, CalendarCheck, CheckCircle2,
} from 'lucide-react';
import SiteLayout from '@/components/site/SiteLayout';
import { Container, PageHero, Hl } from '@/components/site/ui';
import { Field, TextInput, TextArea, SelectInput, validators, serverErrors } from '@/components/site/FormFields';
import { submitAudit } from '@/services/leadService';
import { enqueueSubmission } from '@/lib/leadQueue';
import { MARKETPLACES } from '@/data/site';
import useSeo from '@/hooks/useSeo';

const BENEFITS = [
  { icon: BarChart3, title: 'Account Analysis', text: 'Real data from your actual account.' },
  { icon: Lightbulb, title: 'Actionable Recommendations', text: 'Clear steps you can implement.' },
  { icon: TrendingUp, title: 'Growth Opportunities', text: 'Identify untapped potential to increase sales.' },
  { icon: Target, title: 'No Obligation', text: '100% free audit with no commitment required.' },
];

const AREAS = [
  { icon: Tag, title: 'ASIN Performance', text: 'Top & low performing ASINs, strengths and weaknesses.' },
  { icon: Database, title: 'Advertising Analysis', text: 'Find wasted spend and opportunities to improve ACOS.' },
  { icon: Search, title: 'Keyword Opportunities', text: 'High-performing and underperforming keywords.' },
  { icon: FileText, title: 'Listing Health', text: 'SEO, content, images and conversion rate opportunities.' },
  { icon: PieChart, title: 'Profitability Analysis', text: 'Revenue, margins and profitable ACOS targets.' },
  { icon: Megaphone, title: 'Placement and Day-Parting', text: 'What’s working across placements and time of day.' },
  { icon: Activity, title: 'Account Health', text: 'Overall performance, policy and inventory review.' },
  { icon: CalendarCheck, title: '30-Day Growth Plan', text: 'A clear, customized action plan to improve results.' },
];

const EMPTY = { name: '', email: '', brand: '', marketplace: '', problem: '' };

export default function AuditPage() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useSeo({
    title: 'Free Amazon Account Audit',
    description:
      'Get a free Amazon account audit: ASIN performance, advertising waste, keywords, listing health, profitability and a 30-day growth plan. No commitment.',
    image: '/images/site/audit-hero.webp',
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const errs = {};
    const n = validators.name(form.name);
    if (n) errs.name = n;
    const em = validators.email(form.email);
    if (em) errs.email = em;
    const b = form.brand.trim();
    if (!b) errs.brand = 'Please enter your brand / store name.';
    else if (b.length < 2) errs.brand = 'Brand name must be at least 2 characters.';
    if (!form.marketplace) errs.marketplace = 'Please select your main marketplace.';
    const p = form.problem.trim();
    if (p && p.length < 10) errs.problem = 'Please add a few more details (at least 10 characters), or leave this empty.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(Object.keys(errs)[0])?.focus();
      return;
    }
    setLoading(true);
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      brand: form.brand.trim(),
      marketplace: form.marketplace,
      problem: form.problem.trim() || undefined,
    };
    try {
      await submitAudit(payload);
    } catch (error) {
      const se = serverErrors(error);
      if (se) {
        setErrors(se);
        setLoading(false);
        return;
      }
      enqueueSubmission('audit', payload);
    }
    setSubmitted(true);
    setForm(EMPTY);
    setLoading(false);
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Free Amazon Account Audit"
        title={<>Get a Clear Plan for Your <Hl>Amazon Growth.</Hl></>}
        body="We’ll review your Amazon account, identify what’s working, what’s not, and give you practical recommendations to increase sales and profitability."
        image="/images/site/audit-hero.webp"
        imageAlt="Laptop showing a SellHive sales dashboard with a rising bar chart"
        actions={
          <a
            href="#audit-form"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-hive px-7 py-3.5 text-[15px] font-bold text-navy hover:bg-hive-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
          >
            Request Free Audit <ArrowRight size={17} aria-hidden="true" />
          </a>
        }
        trust={[
          { icon: ShieldCheck, label: '100% Free · No commitment' },
          { icon: FileText, label: 'Actionable insights' },
          { icon: Lock, label: 'Your data stays confidential' },
        ]}
      />

      {/* Benefits */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-jakarta text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
              What You’ll Get in Your <Hl className="text-[#F5B400]">Free Audit</Hl>
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              A clear and practical analysis of your Amazon account to help you identify opportunities and grow profitably.
            </p>
          </div>
          <ul className="mt-12 grid grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className={`px-4 py-4 text-center ${i > 0 ? 'lg:border-l' : ''} ${i % 2 ? 'border-l' : ''} border-slate-200`}>
                <Icon size={40} className="mx-auto text-[#F5B400]" aria-hidden="true" />
                <h3 className="mt-4 font-bold text-navy">{title}</h3>
                <p className="mt-1 text-slate-600 text-[15px]">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 8 areas */}
      <section className="py-16 bg-[#EEF4FC]">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-jakarta text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
              <Hl className="text-[#F5B400]">8 Key Areas</Hl> We Analyze
            </h2>
            <p className="mt-3 text-lg text-slate-600">Our audit covers the most important aspects of your Amazon business.</p>
          </div>
          <ol className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AREAS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="rounded-xl bg-white p-5 shadow-[0_8px_24px_-20px_rgba(8,35,63,0.5)]">
                <div className="flex items-center gap-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5B400] text-sm font-bold text-white">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <Icon size={26} className="text-navy" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-bold text-navy text-lg">{title}</h3>
                <p className="mt-1 text-slate-600 text-[15px]">{text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Form */}
      <section id="audit-form" className="py-16 bg-white scroll-mt-20">
        <Container className="grid lg:grid-cols-[1.5fr_1fr] gap-8 items-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-[0_12px_40px_-28px_rgba(8,35,63,0.5)]">
            <h2 className="font-jakarta text-3xl font-extrabold text-navy tracking-tight">
              Request Your <Hl className="text-[#F5B400]">Free Amazon Audit</Hl>
            </h2>
            <p className="mt-2 text-slate-600">
              Fill in a few details and we’ll review your account and send you a customized audit report with insights and recommendations.
            </p>

            {submitted ? (
              <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-6 text-center" role="status">
                <CheckCircle2 size={40} className="mx-auto text-green-600" aria-hidden="true" />
                <p className="mt-3 font-bold text-navy text-lg">Audit request received.</p>
                <p className="mt-1 text-slate-600">We’ll review your account and reply within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6 grid sm:grid-cols-2 gap-5">
                <Field id="name" label="Your name" required error={errors.name}>
                  <TextInput id="name" autoComplete="name" placeholder="Jane Smith" value={form.name} onChange={set('name')} error={errors.name} />
                </Field>
                <Field id="email" label="Email" required error={errors.email}>
                  <TextInput id="email" type="email" autoComplete="email" placeholder="you@brand.com" value={form.email} onChange={set('email')} error={errors.email} />
                </Field>
                <Field id="brand" label="Brand / Store Name" required error={errors.brand}>
                  <TextInput id="brand" autoComplete="organization" placeholder="Your Amazon brand" value={form.brand} onChange={set('brand')} error={errors.brand} />
                </Field>
                <Field id="marketplace" label="Main Marketplace" required error={errors.marketplace}>
                  <SelectInput id="marketplace" placeholder="Select marketplace" options={MARKETPLACES} value={form.marketplace} onChange={set('marketplace')} error={errors.marketplace} />
                </Field>
                <Field id="problem" label="Additional Information (optional)" error={errors.problem} className="sm:col-span-2">
                  <TextArea id="problem" rows={3} placeholder="Let us know any specific goals or challenges." value={form.problem} onChange={set('problem')} error={errors.problem} />
                </Field>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-hive px-6 py-3.5 font-bold text-navy hover:bg-hive-dark transition-colors disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-hive"
                  >
                    {loading ? 'Sending…' : <>Request Free Audit <ArrowRight size={18} aria-hidden="true" /></>}
                  </button>
                  <p className="mt-3 text-center text-sm text-slate-500">We typically respond within one business day.</p>
                </div>
              </form>
            )}
          </div>

          <aside className="space-y-5">
            <div className="flex gap-4 rounded-2xl bg-mist border border-slate-200 p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white">
                <Lock size={22} className="text-navy" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-bold text-navy">Your Information is Safe</h3>
                <p className="mt-1 text-sm text-slate-600">
                  We keep your information strictly confidential and will never share it with third parties.
                </p>
              </div>
            </div>
            <img
              src="/images/site/audit-report.webp"
              alt="Printed SellHive Amazon Audit Report listing clear insights, actionable recommendations and growth opportunities"
              loading="lazy"
              className="w-full rounded-2xl object-cover"
            />
          </aside>
        </Container>
      </section>
    </SiteLayout>
  );
}
