import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <span className="kicker">Managed by a real Amazon operator</span>
          <h1>
            Cut your wasted ad spend and scale profitable campaigns —{' '}
            <span className="accent">managed by an actual FBA operator</span>, not a design shop.
          </h1>
          <p className="lead">
            We read your advertising data like someone who has actually sold on Amazon.
            Every recommendation is tied to net profit, not vanity clicks.
          </p>
          <div className="hero-actions">
            <Link to="/audit" className="btn btn-primary btn-xl">Book a Free Strategy Call</Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><strong>5+ yrs</strong><span>in Amazon</span></div>
            <div className="hero-stat"><strong>4+ yrs</strong><span>in PPC</span></div>
            <div className="hero-stat"><strong>$10M+</strong><span>sales managed</span></div>
          </div>

          <div className="hero-mini-testimonial">
            <span className="stars">★★★★★</span>
            <blockquote>
              "Our CTR doubled in 14 days and we finally stopped bleeding on the campaigns that were eating our margin."
            </blockquote>
            <span className="author">— Private-label seller, US</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-visual-title">Sample account · before we touched it</div>
          <div className="mock-chart">
            <div className="mock-bar" style={{ height: '30%' }}></div>
            <div className="mock-bar" style={{ height: '48%' }}></div>
            <div className="mock-bar" style={{ height: '40%' }}></div>
            <div className="mock-bar leak" style={{ height: '66%' }}></div>
            <div className="mock-bar" style={{ height: '38%' }}></div>
            <div className="mock-bar" style={{ height: '30%' }}></div>
          </div>
          <div className="mock-legend">
            <span><i className="dot leak"></i> Wasted spend leak</span>
            <span><i className="dot good"></i> Profitable spend</span>
          </div>
        </div>
      </div>
    </section>
  )
}
