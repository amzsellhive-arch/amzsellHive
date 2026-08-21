import { CalendarCheck, Search, Settings, Zap } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: CalendarCheck,
      title: 'Book Strategy Session',
      description: 'A short call to understand your account, your goals, and whether we can actually help.',
    },
    {
      icon: Search,
      title: 'Audit & Gameplan',
      description: 'A real teardown of your advertising with dollar figures attached. Yours to keep either way.',
    },
    {
      icon: Settings,
      title: 'Onboarding & Setup',
      description: 'Campaign restructuring, negative targeting, and the first round of optimizations — usually in week one.',
    },
    {
      icon: Zap,
      title: 'Delivery & Optimization',
      description: 'Ongoing management reported in profit, not vanity. Weekly check-ins, monthly strategy calls.',
    },
  ];

  return (
    <section className="py-20 bg-white border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[hsl(16,80%,52%)] font-bold text-sm uppercase tracking-wider">How It Works</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-4 tracking-tight">
            Four steps to profitable growth
          </h2>
          <p className="text-muted-foreground text-lg">
            A clear process so you know exactly what happens after clicking. No mystery, no sales trap.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative bg-[hsl(30,20%,97%)] rounded-2xl p-7 card-hover">
              {/* Step number */}
              <div className="absolute -top-4 left-7 w-8 h-8 bg-[hsl(16,80%,52%)] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                {i + 1}
              </div>
              <div className="mt-3">
                <step.icon size={28} className="text-[hsl(260,60%,55%)] mb-4" />
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
