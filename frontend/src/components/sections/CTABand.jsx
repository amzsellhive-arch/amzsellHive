import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function CTABand() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[hsl(16,80%,52%)] to-[hsl(16,80%,42%)] rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative">
            <span className="text-white/80 font-bold text-sm uppercase tracking-wider">Your Move</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-3 mb-4 max-w-lg mx-auto">
              Every month you wait, the leak keeps running
            </h2>
            <p className="text-white/80 mb-8 max-w-md mx-auto">
              We'll show you exactly what your account is losing — in dollars, on your own data — before you spend a cent with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/audit">
                <Button
                  size="lg"
                  className="bg-white text-[hsl(16,80%,45%)] hover:bg-white/90 font-bold px-8 rounded-full shadow-lg"
                >
                  Show me what my account is leaking
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="!bg-transparent border-2 border-white text-white hover:!bg-white/10 font-semibold px-8 rounded-full"
                >
                  Talk to Ishfaq first
                </Button>
              </Link>
            </div>
            <p className="text-white/60 text-xs mt-6">
              Free · Yours to keep · No contract · No pitch unless the numbers justify one
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}