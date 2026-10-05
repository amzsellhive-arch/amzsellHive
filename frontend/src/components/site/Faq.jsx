import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function Faq({ items }) {
  const [open, setOpen] = useState(null);
  const half = Math.ceil(items.length / 2);
  const cols = [items.slice(0, half), items.slice(half)];

  return (
    <div className="grid gap-3 md:grid-cols-2 md:gap-x-6">
      {cols.map((col, ci) => (
        <div key={ci} className="space-y-3">
          {col.map((item, i) => {
            const idx = ci * half + i;
            const isOpen = open === idx;
            const id = `faq-${idx}`;
            return (
              <div key={item.q} className="rounded-xl border border-slate-200 bg-white">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${id}-panel`}
                    id={`${id}-btn`}
                    onClick={() => setOpen(isOpen ? null : idx)}
                    className="flex w-full min-h-[56px] items-center gap-4 px-5 py-3 text-left font-semibold text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandblue rounded-xl"
                  >
                    <span className="text-brandblue font-bold w-4 shrink-0">{idx + 1}</span>
                    <span className="flex-1">{item.q}</span>
                    {isOpen ? <Minus size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
                  </button>
                </h3>
                <div
                  id={`${id}-panel`}
                  role="region"
                  aria-labelledby={`${id}-btn`}
                  hidden={!isOpen}
                  className="px-5 pb-4 pl-[3.25rem] text-slate-600 leading-relaxed"
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
