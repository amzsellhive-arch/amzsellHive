import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function ResultsGrid() {
  const [cards, setCards] = useState([
    { id: 1, niche: 'Personal Care', timeframe: '90 days', headline_result: '49% Net Proceeds', description: '$8,706 in sales returning $4,267 net in the account\'s best period.', metric_1_label: 'Net Margin', metric_1_value: '49%', metric_2_label: 'TACOS', metric_2_value: '7.6%', metric_3_label: 'Organic', metric_3_value: '88%' },
    { id: 2, niche: 'Verified Brand', timeframe: '30 days', headline_result: '$2,870 Recovered', description: '$25,467 in sales at 27.2% net margin, up 15.9% MoM.', metric_1_label: 'Net Margin', metric_1_value: '27.2%', metric_2_label: 'Growth', metric_2_value: '+15.9%', metric_3_label: 'Recovered', metric_3_value: '$2,870' },
    { id: 3, niche: 'Home & Kitchen', timeframe: '14 days', headline_result: '110% ACOS → Fixed', description: 'A bleeding product diagnosed and kept net positive.', metric_1_label: 'Before', metric_1_value: '110%', metric_2_label: 'Saved', metric_2_value: '+$842', metric_3_label: 'Status', metric_3_value: 'Fixed' },
  ]);

  return (
    <section className="py-20 bg-[hsl(30,20%,97%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-[hsl(16,80%,52%)] font-bold text-sm uppercase tracking-wider">Proven Results</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-4 tracking-tight">
            Real accounts. Real numbers.
          </h2>
          <p className="text-muted-foreground text-lg">
            Every figure is backable on request. Where something is a target rather than achieved, we say so.
          </p>
        </div>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`bg-white rounded-2xl border border-border overflow-hidden card-hover card-shine result-card-enter stagger-${index + 1}`}
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-[hsl(16,80%,52%)]/10 text-[hsl(16,80%,52%)] text-xs font-bold rounded-full">
                    {card.niche}
                  </span>
                  <span className="text-xs text-muted-foreground">{card.timeframe}</span>
                </div>

                <h3 className="text-xl font-bold mb-2">{card.headline_result}</h3>
                <p className="text-sm text-muted-foreground mb-5">{card.description}</p>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: card.metric_1_label, value: card.metric_1_value },
                    { label: card.metric_2_label, value: card.metric_2_value },
                    { label: card.metric_3_label, value: card.metric_3_value },
                  ].map((m, i) => (
                    <div key={i} className="bg-[hsl(30,20%,97%)] rounded-xl p-3 text-center">
                      <div className="text-[hsl(16,80%,52%)] font-bold text-sm">{m.value}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

<div className="mt-10 text-center">
          <Link to="/results" className="btn-see-results">
            See all results <ArrowRight size={18} className="btn-arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}