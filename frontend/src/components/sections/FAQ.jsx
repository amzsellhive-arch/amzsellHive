import { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    { id: 1, question: 'Is the audit really free?', answer: 'Yes. You keep the audit whether or not we work together. It\'s a real teardown with dollar figures — not a sales call in disguise.', category: 'general' },
    { id: 2, question: 'How much does management cost?', answer: 'We don\'t quote before seeing your account. The audit shows what\'s recoverable, then the fee is set against that. Three structures: flat, performance, or hybrid.', category: 'pricing' },
    { id: 3, question: 'What if I already have an agency?', answer: 'Treat this as a free second opinion. If they\'re doing well you\'ll get confirmation; if spend is leaking you\'ll see exactly where.', category: 'general' },
    { id: 4, question: 'Is there a contract?', answer: 'No. Month to month. We keep clients by performance, not lock-in.', category: 'pricing' },
    { id: 5, question: 'How fast can we start?', answer: 'Audit within 48 hours, onboarding in week one, quick wins inside the first month.', category: 'process' },
    { id: 6, question: 'Who works on my account?', answer: 'Ishfaq — the founder. SellHive is deliberately small. Limited accounts, maximum attention.', category: 'process' },
  ];
  const [openId, setOpenId] = useState(1);

  return (
    <section className="faq-section relative overflow-hidden py-20 bg-gradient-to-b from-white to-[#fffaf5] border-t border-border">
      <div className="absolute left-4 top-6 h-36 w-36 rounded-full bg-[hsl(16,80%,92%)] blur-3xl opacity-70" aria-hidden="true" />
      <div className="absolute right-4 bottom-2 h-44 w-44 rounded-full bg-[hsl(36,95%,88%)] blur-3xl opacity-80" aria-hidden="true" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(16,80%,52%)]/10 border border-[hsl(16,80%,52%)]/30 text-[hsl(16,80%,52%)] font-bold text-xs uppercase tracking-[0.22em]">
            <Sparkles size={13} />
            <span>FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-5 mb-4 tracking-tight text-foreground">
            Straight answers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            The real objections we hear — answered honestly.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <article
              key={faq.id}
              className={`faq-card ${openId === faq.id ? 'is-open' : ''}`}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="faq-question"
                aria-expanded={openId === faq.id}
              >
                <span className="flex items-center gap-3 min-w-0">
                  <span className="faq-icon">
                    <HelpCircle size={15} />
                  </span>
                  <span className="faq-question-text">{faq.question}</span>
                </span>
                <ChevronDown
                  size={18}
                  className={`faq-chevron ${openId === faq.id ? 'is-open' : ''}`}
                />
              </button>
              <div className={`faq-answer-wrap ${openId === faq.id ? 'open' : ''}`}>
                <div className="faq-answer">
                  {faq.answer}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
