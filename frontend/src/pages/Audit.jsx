import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { submitAudit } from '@/services/leadService';
import { enqueueSubmission } from '@/lib/leadQueue';
import { CheckCircle2 } from 'lucide-react';

export default function AuditPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: '', brand: '', email: '', revenue: 'Under $30K', marketplace: 'United States', problem: ''
  });

  const validate = () => {
    const errs = {};
    const name = form.name.trim();
    const brand = form.brand.trim();
    const problem = form.problem.trim();

    if (!name) {
      errs.name = 'Please enter your full name.';
    } else if (name.length < 3) {
      errs.name = 'Your name must be at least 3 characters.';
    } else if (!/^[a-zA-Z][a-zA-Z\s'.-]*$/.test(name)) {
      errs.name = 'Please enter a valid name (letters only).';
    }

    if (!brand) {
      errs.brand = 'Please enter your brand / store name.';
    } else if (brand.length < 2) {
      errs.brand = 'Brand name must be at least 2 characters.';
    }

    if (!form.email) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!problem) {
      errs.problem = 'Please tell us what is bothering you.';
    } else if (problem.length < 10) {
      errs.problem = 'Please give a few more details (at least 10 characters).';
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
      await submitAudit({ ...form });
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
      console.warn('Audit submission network error — queueing for retry:', error);
      enqueueSubmission('audit', { ...form });
    }
    setSubmitted(true);
    setLoading(false);
  };

  const auditSections = [
    { num: '01', title: 'Sales Overview', desc: 'Three months of sales, spend, ACOS, TACOS and ad-sales share.' },
    { num: '02', title: '30-Day Recap', desc: 'Campaign Manager totals — where the last month\'s budget went.' },
    { num: '03', title: 'ASIN Grading', desc: 'Every product graded A/B/C/Cut with its share of total ad spend.' },
    { num: '04', title: 'Match-Type Analysis', desc: 'Auto vs manual, and where broad match is consuming budget.' },
    { num: '05', title: 'Placement Analysis', desc: 'Top of Search vs Rest vs Product Pages — which deserves your money.' },
    { num: '06', title: 'Day-Parting', desc: 'The hours producing orders, and hours spending without returning.' },
    { num: '07', title: 'Listing Health', desc: 'Images, title, A+ content, reviews — the conversion side no bid can fix.' },
    { num: '08', title: 'The Dollars', desc: 'Recoverable spend per month, top bleeders, and your ACOS ceiling.' },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Page Hero */}
        <section className="pt-28 pb-16 bg-gradient-to-br from-[hsl(30,20%,98%)] via-white to-[hsl(16,90%,97%)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <span className="text-[hsl(16,80%,52%)] font-bold text-sm uppercase tracking-wider">Free Account Audit</span>
                <h1 className="text-4xl sm:text-5xl font-extrabold mt-3 mb-5 tracking-tight">
                  Find out what your account is leaking
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  A real teardown of your advertising and listings, with a dollar figure attached to every finding. No cost, no obligation.
                </p>
                <ul className="space-y-3">
                  {[
                    'Delivered within 48 hours of access',
                    'Specific to your account — not a template with your logo',
                    'Ends with clear paths forward and one obvious next step',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 size={16} className="text-[hsl(16,80%,52%)] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Offer Card */}
              <div className="bg-white rounded-2xl border border-border p-7 shadow-lg">
                <div className="text-center mb-5">
                  <h3 className="font-bold text-lg">The Free Account Audit</h3>
                  <p className="text-sm text-muted-foreground mt-1">A real teardown — not a sales call in disguise.</p>
                </div>
                <ul className="space-y-2 mb-5">
                  {[
                    'Every ASIN graded A/B/C/Cut with spend share',
                    'Wasted spend calculated in real dollars/month',
                    'Top three bleeders named with the fix for each',
                    'Maximum profitable ranking ACOS from your margin',
                    'Placement, match-type and day-parting leaks mapped',
                    'A 30-day plan written to daily budget level',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 size={13} className="text-green-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between p-4 bg-[hsl(30,20%,97%)] rounded-xl mb-4">
                  <span className="text-sm text-muted-foreground">What it costs you</span>
                  <span className="text-2xl font-extrabold text-[hsl(16,80%,52%)]">$0</span>
                </div>
                <ul className="space-y-1 text-[11px] text-muted-foreground">
                  <li>• Takes about 10 minutes of your time</li>
                  <li>• You keep the audit whether we work together or not</li>
                  <li>• No contract, ever</li>
                  <li>• If your niche can't win, we'll tell you and walk away</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[hsl(16,80%,52%)] font-bold text-sm uppercase tracking-wider">What's Included</span>
            <h2 className="text-3xl font-extrabold mt-2 mb-8">Eight sections, every one with a number attached</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {auditSections.map((s) => (
                <div key={s.num} className="bg-white rounded-xl border border-border p-5 card-hover">
                  <span className="text-[hsl(16,80%,52%)] font-bold text-xs">{s.num}</span>
                  <h3 className="font-bold text-sm mt-2 mb-1">{s.title}</h3>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Audit Form */}
        <section className="py-16 bg-[hsl(30,20%,97%)] border-y border-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-extrabold mb-3">Audit request received!</h2>
                <p className="text-muted-foreground">
                  You'll hear back within one business day. If your account isn't a fit, we'll say so — and still send you what we found.
                </p>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-extrabold mb-3">Request your free audit</h2>
                  <p className="text-muted-foreground">
                    Fill this in and you'll hear back within one business day.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-border p-8 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Your name *</label>
                      <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Smith" className={`rounded-xl ${errors.name ? 'border-red-400' : ''}`} />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Brand / store name *</label>
                      <Input required value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} placeholder="Your Amazon brand" className={`rounded-xl ${errors.brand ? 'border-red-400' : ''}`} />
                      {errors.brand && <p className="text-xs text-red-500 mt-1">{errors.brand}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email *</label>
                    <Input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@brand.com" className={`rounded-xl ${errors.email ? 'border-red-400' : ''}`} />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Monthly Amazon revenue</label>
                      <select value={form.revenue} onChange={(e) => setForm({ ...form, revenue: e.target.value })} className="w-full px-3 py-2 border border-border rounded-xl text-sm bg-white">
                        <option>Under $30K</option>
                        <option>$30K – $100K</option>
                        <option>$100K – $250K</option>
                        <option>$250K – $500K</option>
                        <option>$500K+</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Main marketplace</label>
                      <select value={form.marketplace} onChange={(e) => setForm({ ...form, marketplace: e.target.value })} className="w-full px-3 py-2 border border-border rounded-xl text-sm bg-white">
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Europe</option>
                        <option>UAE</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">What's bothering you most right now?</label>
                    <Textarea value={form.problem} onChange={(e) => setForm({ ...form, problem: e.target.value })} placeholder="e.g. ACOS has climbed from 30% to 55% since January..." rows={4} className={`rounded-xl ${errors.problem ? 'border-red-400' : ''}`} />
                    {errors.problem && <p className="text-xs text-red-500 mt-1">{errors.problem}</p>}
                    <p className="text-xs text-muted-foreground mt-1">The more specific you are, the more specific your audit.</p>
                  </div>
                  <Button type="submit" disabled={loading} className="w-full btn-glow bg-[hsl(16,80%,52%)] hover:bg-[hsl(16,80%,45%)] text-white font-bold py-6 rounded-full text-base">
                    {loading ? 'Sending...' : 'Send me my free audit'}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    One reply from one human, within one business day. No sales sequence, no spam.
                  </p>
                </form>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
