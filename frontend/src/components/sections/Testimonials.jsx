import { useState } from 'react';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([
    { id: 1, name: 'Sarah M.', role: 'Private Label Seller, USA', quote: 'Ishfaq found $2,870 in wasted spend we didn\'t even know existed. Within 30 days our net margin jumped to 27.2%.', rating: 5 },
    { id: 2, name: 'James K.', role: 'Brand Owner, UK', quote: 'Our ACOS was at 110% on one product. SellHive turned it net positive in two weeks.', rating: 5 },
    { id: 3, name: 'Ahmed R.', role: 'Multi-SKU Seller, UAE', quote: 'Finally an agency that reports in profit, not just revenue. Our TACOS went from 18% to under 8%.', rating: 5 },
  ]);

  return (
    <section className="py-20 bg-[hsl(30,20%,97%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[hsl(16,80%,52%)] font-bold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-4 tracking-tight">
            What sellers say
          </h2>
          <p className="text-muted-foreground text-lg">
            Real feedback from real accounts. No actors, no scripts.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl border border-border p-7 card-hover">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="text-foreground text-sm leading-relaxed mb-6 italic">
                "{t.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[hsl(16,80%,52%)]/10 flex items-center justify-center text-[hsl(16,80%,52%)] font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}