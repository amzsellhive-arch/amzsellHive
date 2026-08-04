import { Link } from 'react-router-dom'

export default function Positioning() {
  return (
    <section className="section-alt">
      <div className="container positioning-grid">
        <div>
          <span className="kicker">Who we are</span>
          <h2>The ads agency run by a real FBA operator</h2>
          <p>
            We read your data like someone who's actually sold on Amazon — not a designer guessing.
            Every campaign decision is tied to gross and net profit, with the math shown before you're asked to pay.
          </p>
          <ul className="ticks">
            <li><strong>Project or retainer</strong> — pick whichever fits how you work.</li>
            <li><strong>Proof before payment</strong> — free audit shows real dollars on your own account first.</li>
            <li><strong>No lock-in</strong> — we keep clients by performance, never contract length.</li>
          </ul>
          <div className="hero-actions">
            <Link to="/audit" className="btn btn-primary">Book a Free Strategy Call</Link>
          </div>
        </div>
        <div className="positioning-visual">
          <div className="video-frame">
            <span className="video-play">▶</span>
            <p>Meet the operator running your account</p>
          </div>
        </div>
      </div>
    </section>
  )
}
