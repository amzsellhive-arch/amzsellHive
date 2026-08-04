import { useState } from 'react'

const groups = [
  {
    title: 'Strategy & process',
    items: [
      { q: 'Can I skip the strategy call?', a: "You can — but the call is where we gather the numbers that make the audit useful. It's free, it's short, and it's the first step of the system, not a sales pitch." },
      { q: 'We already have an agency. Is this worth it?', a: "Treat the free audit as a second opinion. If they're doing well, you'll get confirmation. If spend is leaking, you'll see exactly where — and you keep the report either way." },
    ],
  },
  {
    title: 'Pricing & logistics',
    items: [
      { q: 'How much does it cost?', a: "We work project or retainer, month to month. We'll show you the math on your own account first — and only if the numbers justify it do we talk about fees." },
      { q: 'Is there a contract?', a: 'No lock-in, ever. We keep clients by performance, not by contract length.' },
    ],
  },
  {
    title: 'Results',
    items: [
      { q: 'What if I already tried other agencies?', a: "That's exactly who we're built for. If agencies only sold you revenue while margin went backwards, we run the opposite way — everything tied to gross and net profit, with screenshots you can verify." },
      { q: 'Do you guarantee results?', a: "We separate verified results from targets, and we're honest about what your niche can win. If it can't win, we'll tell you and walk away." },
    ],
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section">
      <div className="container">
        <div className="section-head centered">
          <span className="kicker">Questions</span>
          <h2>Everything sellers ask before booking</h2>
        </div>

        {groups.map((g, gi) => (
          <div key={gi} style={{ marginBottom: 28 }}>
            <h3 style={{ marginBottom: 12 }}>{g.title}</h3>
            {g.items.map((it, ii) => {
              const idx = gi * 10 + ii
              const isOpen = open === idx
              return (
                <div className={`faq-item ${isOpen ? 'open' : ''}`} key={ii}>
                  <button className="faq-q" onClick={() => setOpen(isOpen ? -1 : idx)}>
                    {it.q}
                    <span className="chev">▾</span>
                  </button>
                  {isOpen && <div className="faq-a">{it.a}</div>}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}
