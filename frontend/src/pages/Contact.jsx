import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { submitLead } from '@/services/leadService';
import { enqueueSubmission } from '@/lib/leadQueue';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Linkedin } from 'lucide-react';

const TOPICS = [
  'Account & PPC management',
  'Free audit',
  'Launching a new product',
  'Account health / suspension',
  'Something else',
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: '', email: '', brand: '', topic: TOPICS[0], message: ''
  });

  const validate = () => {
    const errs = {};
    const name = form.name.trim();
    const brand = form.brand.trim();
    const message = form.message.trim();

    if (!name) {
      errs.name = 'Please enter your full name.';
    } else if (name.length < 3) {
      errs.name = 'Your name must be at least 3 characters.';
    } else if (!/^[a-zA-Z][a-zA-Z\s'.-]*$/.test(name)) {
      errs.name = 'Please enter a valid name (letters only).';
    }

    if (!form.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (brand && brand.length < 2) {
      errs.brand = 'Brand name must be at least 2 characters.';
    }

    if (!message) {
      errs.message = 'Please write a message.';
    } else if (message.length < 10) {
      errs.message = 'Please add a few more details (at least 10 characters).';
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    try {
      await submitLead({ ...form });
    } catch (error) {
      // Show server-side validation errors inline if the backend rejects the data
      if (error?.response?.status === 422 && error.response.data?.errors) {
        const serverErrors = {};
        Object.keys(error.response.data.errors).forEach((key) => {
          serverErrors[key] = error.response.data.errors[key][0];
        });
        setErrors(serverErrors);
        setLoading(false);
        return;
      }
      // For any other failure (network/CORS/timeout), the backend may have
      // been unreachable — save the submission locally so it is NEVER lost.
      // It will be auto-retried the next time the app loads / backend is back.
      console.warn('Contact submission network error — queueing for retry:', error);
      enqueueSubmission('lead', { ...form });
    }
    setSubmitted(true);
    setForm({ name: '', email: '', brand: '', topic: TOPICS[0], message: '' });
    setLoading(false);
  };

  const inputClass = (key) =>
    `rounded-xl ${errors[key] ? 'border-red-400' : ''}`;

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Page Hero */}
        <section className="pt-28 pb-12 bg-gradient-to-br from-[hsl(30,20%,98%)] via-white to-[hsl(260,60%,97%)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold mt-3 mb-5 tracking-tight">
              Talk to the person who'll run your account
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No sales team, no gatekeeper. Messages come straight to Ishfaq, and you'll get a reply within one business day.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-extrabold mb-6">Get in touch</h2>
                <div className="space-y-4 mb-8">
                  {[
                    { icon: Mail, label: 'Email', value: 'ishfaq@sellhive.com' },
                    { icon: Phone, label: 'WhatsApp', value: 'Available on request' },
                    { icon: Linkedin, label: 'LinkedIn', value: 'Ishfaq Ahmad' },
                    { icon: MapPin, label: 'Based in', value: 'Islamabad, Pakistan — US, UK & EU marketplaces' },
                    { icon: Clock, label: 'Response time', value: 'Within one business day' },
                  ].map((item, i) => (
                    <div key={i} className="contact-anim-border">
                      <div className="flex items-center gap-4 p-4 bg-[hsl(30,20%,97%)] rounded-[12px]">
                        <div className="w-10 h-10 rounded-lg bg-[hsl(16,80%,52%)]/10 flex items-center justify-center">
                          <item.icon size={18} className="text-[hsl(16,80%,52%)]" />
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">{item.label}</div>
                          <div className="text-sm font-medium">{item.value}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-[hsl(16,90%,97%)] rounded-xl border border-[hsl(16,80%,52%)]/20 p-5">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Fastest route to something useful:</strong> request the free audit instead. You'll get real findings on your own account rather than a discovery call.
                  </p>
                  <Link to="/audit" className="inline-block mt-3">
                    <Button className="btn-glow bg-[hsl(16,80%,52%)] hover:bg-[hsl(16,80%,45%)] text-white font-semibold px-5 rounded-full text-sm">
                      Show me what my account is leaking
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl border border-border p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-extrabold mb-3">Message sent — thank you!</h3>
                    <p className="text-muted-foreground">
                      Thanks for reaching out. Your message has come straight to Ishfaq, and you'll hear back within one business day.
                    </p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 w-full btn-glow bg-[hsl(16,80%,52%)] hover:bg-[hsl(16,80%,45%)] text-white font-bold py-6 rounded-full text-base"
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-bold text-lg mb-6">Send a message</h3>
                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Your name *</label>
                          <Input
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Jane Smith"
                            className={inputClass('name')}
                          />
                          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Email *</label>
                          <Input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="you@brand.com"
                            className={inputClass('email')}
                          />
                          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Brand (optional)</label>
                        <Input
                          value={form.brand}
                          onChange={(e) => setForm({ ...form, brand: e.target.value })}
                          placeholder="Your Amazon brand"
                          className={inputClass('brand')}
                        />
                        {errors.brand && <p className="text-xs text-red-500 mt-1">{errors.brand}</p>}
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">What's this about?</label>
                        <select
                          value={form.topic}
                          onChange={(e) => setForm({ ...form, topic: e.target.value })}
                          className="w-full px-3 py-2 border border-border rounded-xl text-sm bg-white"
                        >
                          {TOPICS.map((t) => (
                            <option key={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Message *</label>
                        <Textarea
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Tell us about your account and what you're trying to fix."
                          rows={5}
                          className={inputClass('message')}
                        />
                        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                      </div>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-glow bg-[hsl(16,80%,52%)] hover:bg-[hsl(16,80%,45%)] text-white font-bold py-6 rounded-full text-base"
                      >
                        {loading ? 'Sending...' : 'Send Message'}
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        One human reads every message. You'll hear back within one business day.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

