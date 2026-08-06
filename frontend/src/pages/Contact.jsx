import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { submitLead } from '@/services/leadService';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Linkedin } from 'lucide-react';

export default function ContactPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', brand: '', topic: 'Account & PPC management', message: ''
  });

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitLead({ ...form });
      toast({ title: 'Message sent!', description: 'You\'ll hear back within one business day.' });
      setForm({ name: '', email: '', brand: '', topic: 'Account & PPC management', message: '' });
    } catch {
      toast({ title: 'Something went wrong', description: 'Please try again or email directly.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

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
                <h3 className="font-bold text-lg mb-6">Send a message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Your name *</label>
                      <Input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Jane Smith"
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Email *</label>
                      <Input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@brand.com"
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Brand (optional)</label>
                    <Input
                      value={form.brand}
                      onChange={(e) => setForm({ ...form, brand: e.target.value })}
                      placeholder="Your Amazon brand"
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">What's this about?</label>
                    <select
                      value={form.topic}
                      onChange={(e) => setForm({ ...form, topic: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-xl text-sm bg-white"
                    >
                      <option>Account & PPC management</option>
                      <option>Free audit</option>
                      <option>Launching a new product</option>
                      <option>Account health / suspension</option>
                      <option>Something else</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Message *</label>
                    <Textarea
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your account and what you're trying to fix."
                      rows={5}
                      className="rounded-xl"
                    />
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
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}