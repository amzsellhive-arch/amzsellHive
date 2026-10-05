import { useState } from 'react';
import { ArrowRight, ShieldCheck, FileText, Lock, Clock, Mail, CheckCircle2 } from 'lucide-react';
import SiteLayout from '@/components/site/SiteLayout';
import { Container, PageHero, Hl } from '@/components/site/ui';
import { Field, TextInput, TextArea, SelectInput, validators, serverErrors } from '@/components/site/FormFields';
import { BrandIcon } from '@/components/site/BrandIcons';
import { submitLead } from '@/services/leadService';
import { enqueueSubmission } from '@/lib/leadQueue';
import { MARKETPLACES, HELP_TOPICS, whatsappLink } from '@/data/site';
import useSiteSettings from '@/hooks/useSiteSettings';
import useSeo from '@/hooks/useSeo';

const EMPTY = { name: '', email: '', brand: '', marketplace: '', topic: '', message: '' };

const TRUST = [
  { icon: ShieldCheck, label: 'Expert-led analysis' },
  { icon: FileText, label: 'No long-term contract' },
  { icon: Lock, label: '100% confidential' },
];

export default function ContactPage() {
  const { settings } = useSiteSettings();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useSeo({
    title: 'Contact SellHive',
    description:
      'Tell us what you’re working on or where you need help with your Amazon account. We respond within one business day.',
    image: '/images/site/contact-hero.webp',
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const errs = {};
    const n = validators.name(form.name);
    if (n) errs.name = n;
    const em = validators.email(form.email);
    if (em) errs.email = em;
    if (form.brand.trim() && form.brand.trim().length < 2) errs.brand = 'Brand name must be at least 2 characters.';
    const msg = form.message.trim();
    if (!msg) errs.message = 'Please write a message.';
    else if (msg.length < 10) errs.message = 'Please add a few more details (at least 10 characters).';
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
      brand: form.brand.trim() || undefined,
      topic: form.topic || undefined,
      message: form.marketplace
        ? `Main marketplace: ${form.marketplace}\n\n${form.message.trim()}`
        : form.message.trim(),
    };
    try {
      await submitLead(payload);
    } catch (error) {
      const se = serverErrors(error);
      if (se) {
        setErrors(se);
        setLoading(false);
        return;
      }
      // Backend unreachable — keep the message locally and retry later so it is never lost.
      enqueueSubmission('lead', payload);
    }
    setSubmitted(true);
    setForm(EMPTY);
    setLoading(false);
  };

  const wa = whatsappLink(settings.whatsapp);
  const channels = [
    {
      icon: <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-hive"><Mail size={24} className="text-navy" /></span>,
      title: 'Email',
      value: settings.email,
      href: `mailto:${settings.email}`,
      text: 'For general inquiries.',
    },
    {
      icon: <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#25D366]"><BrandIcon name="whatsapp" size={26} color="#fff" /></span>,
      title: 'WhatsApp Number',
      value: settings.whatsapp,
      href: wa,
      external: true,
      text: 'For international clients. Reach us on WhatsApp using our dedicated number.',
    },
    {
      icon: <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-hive"><BrandIcon name="linkedin" size={24} color="#08233F" /></span>,
      title: 'LinkedIn',
      value: settings.linkedin_label || 'Ishfaq Ahmad',
      href: settings.linkedin,
      external: true,
      text: 'Connect for business discussions.',
    },
    {
      icon: <span className="flex h-12 w-12 items-center justify-center"><Clock size={40} className="text-hive" strokeWidth={2.2} /></span>,
      title: 'Response Time',
      value: 'Within one business day',
      text: 'We’ll review your message and get back to you soon.',
    },
  ];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact us"
        title={<>Let’s Talk About Your <Hl>Amazon Growth.</Hl></>}
        body="Tell us what you’re working on, what isn’t working, or where you need help. We’ll get back to you with the right next step."
        image="/images/site/contact-hero.webp"
        imageAlt="Amazon boxes and a laptop on a desk in front of a SellHive sign"
        trust={TRUST}
      />

      <section className="py-14 bg-white">
        <Container className="grid lg:grid-cols-[1.45fr_1fr] gap-8 items-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-[0_12px_40px_-28px_rgba(8,35,63,0.5)]">
            <h2 className="font-jakarta text-3xl font-extrabold text-navy tracking-tight">Send Us a Message</h2>
            <p className="mt-2 text-slate-600">
              Fill in a few details and let us know how we can help. We’ll review your information and get back to you.
            </p>

            {submitted ? (
              <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-6 text-center" role="status">
                <CheckCircle2 size={40} className="mx-auto text-green-600" aria-hidden="true" />
                <p className="mt-3 font-bold text-navy text-lg">Message sent.</p>
                <p className="mt-1 text-slate-600">Thanks — we’ll reply within one business day.</p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-sm font-semibold text-brandblue hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6 grid sm:grid-cols-2 gap-5">
                <Field id="name" label="Your name" required error={errors.name}>
                  <TextInput id="name" autoComplete="name" placeholder="Jane Smith" value={form.name} onChange={set('name')} error={errors.name} />
                </Field>
                <Field id="email" label="Email" required error={errors.email}>
                  <TextInput id="email" type="email" autoComplete="email" placeholder="you@brand.com" value={form.email} onChange={set('email')} error={errors.email} />
                </Field>
                <Field id="brand" label="Brand / Store Name (optional)" error={errors.brand}>
                  <TextInput id="brand" autoComplete="organization" placeholder="Your Amazon brand" value={form.brand} onChange={set('brand')} error={errors.brand} />
                </Field>
                <Field id="marketplace" label="Main Marketplace">
                  <SelectInput id="marketplace" placeholder="Select marketplace" options={MARKETPLACES} value={form.marketplace} onChange={set('marketplace')} />
                </Field>
                <Field id="topic" label="What do you need help with?" className="sm:col-span-2">
                  <SelectInput id="topic" placeholder="Select an option" options={HELP_TOPICS} value={form.topic} onChange={set('topic')} />
                </Field>
                <Field id="message" label="Message" required error={errors.message} className="sm:col-span-2">
                  <TextArea id="message" placeholder="Tell us about your account and what you’re trying to achieve." value={form.message} onChange={set('message')} error={errors.message} />
                </Field>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-hive px-6 py-3.5 font-bold text-navy hover:bg-hive-dark transition-colors disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-hive"
                  >
                    {loading ? 'Sending…' : <>Send Message <ArrowRight size={18} aria-hidden="true" /></>}
                  </button>
                  <p className="mt-3 text-center text-sm text-slate-500">We typically respond within one business day.</p>
                </div>
              </form>
            )}
          </div>

          <aside>
            <h2 className="font-jakarta text-2xl font-extrabold text-navy">Prefer to Reach Out Directly?</h2>
            <p className="mt-2 text-slate-600">You can also contact us through the following channels.</p>
            <ul className="mt-5 space-y-4">
              {channels.filter((c) => c.value).map((c) => {
                const body = (
                  <>
                    {c.icon}
                    <span className="min-w-0">
                      <span className="block font-bold text-navy">{c.title}</span>
                      <span className="block font-semibold text-navy break-words">{c.value}</span>
                      <span className="block text-sm text-slate-600 mt-0.5">{c.text}</span>
                    </span>
                  </>
                );
                const cls = 'flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_-20px_rgba(8,35,63,0.5)]';
                return (
                  <li key={c.title}>
                    {c.href ? (
                      <a
                        href={c.href}
                        className={`${cls} hover:border-brandblue/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandblue`}
                        {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {body}
                      </a>
                    ) : (
                      <div className={cls}>{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </aside>
        </Container>
      </section>

      <section className="pb-16 bg-white" aria-label="Why contact SellHive">
        <Container>
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-6 rounded-2xl bg-mist px-6 py-6">
            {[...TRUST, { icon: Clock, label: 'Response within one business day' }].map(({ icon: Icon, label }, i) => (
              <li key={label} className={`flex items-center gap-3 ${i > 0 ? 'lg:border-l lg:border-slate-300 lg:pl-6' : ''}`}>
                <Icon size={34} className="shrink-0 text-[#F5B400]" aria-hidden="true" />
                <span className="font-medium text-navy">{label}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </SiteLayout>
  );
}
