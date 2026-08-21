import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export default function FounderLetter() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-border p-8 md:p-12 shadow-sm">
          <span className="text-[hsl(16,80%,52%)] font-bold text-sm uppercase tracking-wider">A note from the founder</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-3 mb-8 tracking-tight">
            Dear Amazon Seller,
          </h2>

          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <p>
              I know what it feels like to watch your ad spend climb while your net profit stays flat — or worse, drops. I've managed it from the inside: a 40-person team, $652K in a single quarter, TACOS held near 5% through a team split, a thousand deleted SPUs, and Buy Box losses from auto-pricing.
            </p>
            <p>
              What I kept seeing was the same pattern: brands sold revenue growth that quietly destroyed their margin. Agencies sending sales screenshots while the net number went backwards. Reports full of impressions and clicks, but silent on the only number that matters — did you actually make money?
            </p>
            <p>
              SellHive runs the opposite way. Every account managed to gross and net profit, with the math shown before anyone is asked to pay. The free audit isn't a lead magnet — it's how I prove competence before asking for trust.
            </p>
            <p>
              If your niche can't win, I'll tell you and walk away. If it can, I'll show you exactly where the money is leaking and what it takes to fix it.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="font-bold text-foreground">Ishfaq Ahmad</div>
              <div className="text-sm text-muted-foreground">Founder, SellHive</div>
            </div>
            <Link to="/audit">
              <Button className="btn-glow bg-[hsl(16,80%,52%)] hover:bg-[hsl(16,80%,45%)] text-white font-semibold px-6 rounded-full">
                Show me what my account is leaking
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
