import { Link } from 'react-router-dom';
import { ArrowRight, TrendingDown, DollarSign, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative pt-28 pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(30,20%,98%)] via-white to-[hsl(16,90%,97%)]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[hsl(16,80%,52%)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[hsl(260,60%,55%)]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="animate-slide-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[hsl(16,80%,52%)]/10 text-[hsl(16,80%,52%)] text-sm font-semibold rounded-full mb-6">
              <Target size={14} />
              Founder-Led Amazon Management
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight text-foreground mb-6">
              Cut your wasted ad spend and scale{' '}
              <span className="text-[hsl(16,80%,52%)]">profitable campaigns</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-[540px]">
              Managed by an actual Amazon operator, not a design shop. We read your data like someone who's actually sold on Amazon — because we have.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/audit">
                <Button
                  size="lg"
                  className="btn-glow btn-pulse bg-[hsl(16,80%,52%)] hover:bg-[hsl(16,80%,45%)] text-white font-bold px-8 py-6 text-base rounded-full shadow-lg"
                >
                  Book a Free Strategy Call
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link to="/results">
                <Button
                  size="lg"
                  variant="outline"
                  className="font-semibold px-8 py-6 text-base rounded-full border-2 hover:bg-foreground hover:text-white transition-all"
                >
                  See Our Results
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 flex-wrap">
              <div>
                <div className="text-2xl font-extrabold text-[hsl(16,80%,52%)]">5+</div>
                <div className="text-sm text-muted-foreground">Years in Amazon</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[hsl(16,80%,52%)]">$10M+</div>
                <div className="text-sm text-muted-foreground">Sales Managed</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[hsl(16,80%,52%)]">~5%</div>
                <div className="text-sm text-muted-foreground">TACOS at Scale</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="animate-slide-up stagger-2">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-border/50">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-3 text-xs text-muted-foreground font-medium">Free Audit Preview</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
                  <div className="flex items-center gap-3">
                    <TrendingDown className="text-red-500" size={20} />
                    <span className="font-medium text-sm">Wasted Spend Found</span>
                  </div>
                  <span className="text-red-600 font-bold">$2,870/mo</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="flex items-center gap-3">
                    <DollarSign className="text-green-600" size={20} />
                    <span className="font-medium text-sm">Recoverable Revenue</span>
                  </div>
                  <span className="text-green-600 font-bold">+$4,200/mo</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-[hsl(16,90%,97%)] rounded-xl border border-[hsl(16,80%,52%)]/20">
                  <div className="flex items-center gap-3">
                    <Target className="text-[hsl(16,80%,52%)]" size={20} />
                    <span className="font-medium text-sm">Your ACOS Ceiling</span>
                  </div>
                  <span className="text-[hsl(16,80%,52%)] font-bold">32%</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[hsl(30,20%,97%)] rounded-xl">
                <p className="text-xs text-muted-foreground italic">
                  "Our CTR doubled in 14 days and ACOS dropped from 55% to 28%. The audit paid for itself before we even started." — Recent client
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}