// Supports video embeds and image/screenshot cards.
export default function Testimonials() {
  const items = [
    {
      type: 'video',
      src: '',
      quote: 'Within a month our ACOS dropped and the profit was actually there at the end. First time in two years.',
      author: 'Private-label seller · Home & Kitchen',
      initials: 'HC',
    },
    {
      type: 'image',
      quote: 'They found a SKU running 67% ACOS we had been paying for months. Recovered spend paid for the whole retainer.',
      author: 'WhatsApp screenshot · Brand 2',
      initials: 'B2',
    },
    {
      type: 'image',
      quote: 'The free audit alone was worth more than the last agency we paid for a year. Numbers I could actually use.',
      author: 'Email testimonial · Brand 3',
      initials: 'B3',
    },
  ]

  return (
    <section className="section-alt">
      <div className="container">
        <div className="section-head centered">
          <span className="kicker">Proof #2</span>
          <h2>What sellers say</h2>
          <p>Real testimonials — video and screenshots, the hardest formats to fake.</p>
        </div>
        <div className="grid-3">
          {items.map((t, i) => (
            <div className="testimonial" key={i}>
              <div className="stars">★★★★★</div>
              {t.type === 'video' && t.src ? (
                <div className="video-frame tall">
                  <iframe title="testimonial" src={t.src} frameBorder="0" allowFullScreen></iframe>
                </div>
              ) : (
                <div className="testimonial-still">
                  <div className="avatar">{t.initials}</div>
                  <span className="still-tag">{t.type === 'video' ? 'Play video' : 'Screenshot'}</span>
                </div>
              )}
              <blockquote>{t.quote}</blockquote>
              <div className="author">
                <div className="avatar">{t.initials}</div>
                <div><strong>{t.author}</strong><span>Verified client</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
