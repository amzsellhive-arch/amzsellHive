import { Link } from 'react-router-dom'

export default function HowItWorks() {
  const steps = [
    { t: 'Book a Strategy Session', d: "A free call. We talk about your account, your numbers, and whether we're a fit. No pitch deck." },
    { t: 'Audit & Gameplan', d: 'We read your campaigns and hand you a written plan with real dollar figures attached.' },
    { t: 'Onboarding & Setup', d: 'Read-only access, structure reset, and quick wins land inside the first month.' },
    { t: 'Delivery & Optimization', d: 'We manage, report in GP and NP, and keep optimizing every week. Month to month, no lock-in.' },
  ]

  return (
    <section className="section">
      <div className="container">
        <div className="section-head centered">
          <span className="kicker">How it works</span>
          <h2>Four steps. No guesswork.</h2>
          <p>You'll know exactly what happens after you click — because the free call is step one of a system, not a sales trap.</p>
        </div>
        <div className="steps">
          {steps.map((s, i) => (
            <div className="step" key={i}>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
        <div className="center" style={{ textAlign: 'center', marginTop: 48 }}>
          <Link to="/audit" className="btn btn-primary btn-xl">Book a Free Strategy Call</Link>
        </div>
      </div>
    </section>
  )
}
