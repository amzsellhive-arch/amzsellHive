import { Link } from 'react-router-dom'

export default function Services() {
  const services = [
    { icon: '▼', title: 'Lower Your ACoS', desc: 'We find where broad match and bad placements are quietly eating your budget — and fix it.' },
    { icon: '▲', title: 'Scale Profitable Campaigns', desc: 'Win the placements that return net profit, and scale the SKUs that actually carry revenue.' },
    { icon: '◎', title: 'Fix What Happens After the Click', desc: 'Listing health, A+ content and conversion — the side no bid can fix, and the one that decides your ACOS.' },
  ]

  return (
    <section className="section-alt">
      <div className="container">
        <div className="section-head centered">
          <span className="kicker">Services</span>
          <h2>Framed as outcomes, not tasks</h2>
          <p>We don't "run ads." We lower your cost, scale your profit, and fix what's killing the click.</p>
        </div>
        <div className="grid-3">
          {services.map((s, i) => (
            <div className="card" key={i}>
              <div className="icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="center" style={{ textAlign: 'center', marginTop: 40 }}>
          <Link to="/services" className="btn btn-outline">See all services</Link>
        </div>
      </div>
    </section>
  )
}
