import { useState } from 'react'
import { submitLead } from '../../services/leadService'

const steps = [
  ['name', 'email', 'service'],
  ['products', 'asin', 'phone'],
  ['budget', 'comments'],
]

export default function QualificationForm() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', email: '', service: '', products: '', asin: '', phone: '', budget: '', comments: '',
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1)
    else handleSubmit()
  }

  const handleSubmit = async () => {
    try {
      await submitLead(form)
      setDone(true)
    } catch (err) {
      setError('Something went wrong. Please try again or email us directly.')
    }
  }

  const labels = {
    name: 'Your name', email: 'Email', service: 'Which service can we help with?',
    products: 'How many products do you sell?', asin: 'ASIN / store URL (optional)',
    phone: 'Phone / WhatsApp', budget: 'Monthly ad budget', comments: 'Anything else? Leave it here.',
  }

  if (done) {
    return (
      <section className="section-alt">
        <div className="container center" style={{ textAlign: 'center', maxWidth: 560 }}>
          <span className="kicker">Request received</span>
          <h2>Thank you — we're on it.</h2>
          <p>Check your inbox for a confirmation. A real operator replies within one business day, no sales sequence.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="section-alt">
      <div className="container qual-grid">
        <div>
          <span className="kicker">Tell us where to look</span>
          <h2>One quick form, then a free call</h2>
          <p>
            A few short questions so we can pre-research your account and show up with something useful.
            Asking about budget upfront means we only spend calls on sellers it actually makes sense to help.
          </p>
          <ul className="ticks">
            <li>Take ~2 minutes, one question at a time</li>
            <li>You keep the audit whether we work together or not</li>
            <li>No contract, ever</li>
          </ul>
        </div>

        <form className="form-card" onSubmit={(e) => { e.preventDefault(); next(); }}>
          <div className="qual-progress">
            Step {step + 1} of {steps.length}
            <div className="qual-bar"><div className="qual-fill" style={{ width: `${((step + 1) / steps.length) * 100}%` }}></div></div>
          </div>

          {steps[step].map((field) => (
            <div className="form-group" key={field}>
              <label htmlFor={field}>{labels[field]}</label>
              {field === 'comments' ? (
                <textarea id={field} name={field} rows={3} value={form[field]} onChange={handleChange} />
              ) : field === 'service' || field === 'budget' ? (
                <select id={field} name={field} value={form[field]} onChange={handleChange} required>
                  <option value="">Select…</option>
                  {field === 'service' ? (
                    <>
                      <option>Lower my ACoS</option>
                      <option>Scale profitable campaigns</option>
                      <option>Fix conversion / listing</option>
                      <option>Full account management</option>
                    </>
                  ) : (
                    <>
                      <option>Under $1,000</option>
                      <option>$1,000 – $2,000</option>
                      <option>$2,000 – $5,000</option>
                      <option>$5,000 – $10,000</option>
                      <option>$10,000+</option>
                    </>
                  )}
                </select>
              ) : (
                <input id={field} name={field} type={field === 'email' ? 'email' : 'text'} value={form[field]} onChange={handleChange} required={field === 'name' || field === 'email'} placeholder={field === 'name' ? 'Jane Smith' : field === 'email' ? 'you@brand.com' : ''} />
              )}
            </div>
          ))}

          {error && <p className="form-error">{error}</p>}

          <div className="btn-row">
            {step > 0 && (
              <button type="button" className="btn btn-outline" onClick={() => setStep(step - 1)}>Back</button>
            )}
            <button type="submit" className="btn btn-primary">
              {step < steps.length - 1 ? 'Continue' : 'Book my free strategy call'}
            </button>
          </div>
          <p className="form-note">One reply from one human, within one business day.</p>
        </form>
      </div>
    </section>
  )
}
