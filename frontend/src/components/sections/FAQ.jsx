import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [faqs, setFaqs] = useState([
    { id: 1, question: 'Is the audit really free?', answer: 'Yes. You keep the audit whether or not we work together. It\'s a real teardown with dollar figures — not a sales call in disguise.', category: 'general' },
    { id: 2, question: 'How much does management cost?', answer: 'We don\'t quote before seeing your account. The audit shows what\'s recoverable, then the fee is set against that. Three structures: flat, performance, or hybrid.', category: 'pricing' },
    { id: 3, question: 'What if I already have an agency?', answer: 'Treat this as a free second opinion. If they\'re doing well you\'ll get confirmation; if spend is leaking you\'ll see exactly where.', category: 'general' },
    { id: 4, question: 'Is there a contract?', answer: 'No. Month to month. We keep clients by performance, not lock-in.', category: 'pricing' },
    { id: 5, question: 'How fast can we start?', answer: 'Audit within 48 hours, onboarding in week one, quick wins inside the first month.', category: 'process' },
    { id: 6, question: 'Who works on my account?', answer: 'Ishfaq — the founder. SellHive is deliberately small. Limited accounts, maximum attention.', category: 'process' },
  ]);
  const [openId, setOpenId] = useState(null);

  return (
    <section className="py-20 bg-white border-t border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[hsl(16,80%,52%)] font-bold text-sm uppercase tracking-wider">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-4 tracking-tight">
            Straight answers
          </h2>
          <p className="text-muted-foreground text-lg">
            The real objections we hear — answered honestly.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-[hsl(30,20%,97%)] rounded-xl border border-border overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-semibold text-sm pr-4">{faq.question}</span>
                <ChevronDown
                  size={18}
                  className={`text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                    openId === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openId === faq.id && (
                <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}