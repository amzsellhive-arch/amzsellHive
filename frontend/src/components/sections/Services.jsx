import { Link } from 'react-router-dom';
import { TrendingDown, BarChart3, Rocket, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ServicesSection() {
  const services = [
    {
      icon: TrendingDown,
      title: 'Lower Your ACOS',
      description: 'We find and kill the wasted spend hiding in your campaigns. Every dollar recovered goes back to terms that actually convert.',
      color: 'hsl(16,80%,52%)',
    },
    {
      icon: Rocket,
      title: 'Scale Profitable Campaigns',
      description: 'Growth with a ceiling, not a guess. We set your TACOS limit and scale within it — budget increases only when the math works.',
      color: 'hsl(260,60%,55%)',
    },
    {
      icon: BarChart3,
      title: 'Fix What Happens After the Click',
      description: 'No bid fixes a listing that converts at 4%. We optimize A+ content, images, and copy so your traffic actually buys.',
      color: 'hsl(150,60%,35%)',
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-[hsl(16,80%,52%)] font-bold text-sm uppercase tracking-wider">Services</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-4 tracking-tight">
            Three outcomes, not a task list
          </h2>
          <p className="text-muted-foreground text-lg">
            We frame everything as the result you get — not the work we do. Because you're paying for outcomes, not hours.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl border border-border p-8 card-hover relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 w-full h-1 transition-all duration-300 group-hover:h-1.5"
                style={{ background: service.color }}
              />
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${service.color}15` }}
              >
                <service.icon size={24} style={{ color: service.color }} />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

<div className="mt-10 text-center">
          <Button asChild size="lg" className="group btn-animated">
            <Link to="/services">
              View all services &amp; pricing
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
