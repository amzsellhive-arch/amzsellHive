import { Link } from 'react-router-dom'

export default function FounderLetter() {
  return (
    <section className="section founder">
      <div className="container founder-letter">
        <span className="kicker">A letter from the founder</span>
        <h2>Dear Amazon Seller,</h2>

        <p>
          I've spent five years inside Amazon operations — four of them in advertising. I've watched click costs
          climb while conversions stayed flat. I've seen sessions go up while profit went backwards. And I've seen
          competitors copy a listing within weeks of it taking off.
        </p>
        <p>
          Most of all, I've watched brands get sold a story. Agencies with big boards and "revenue growth" decks,
          while the net number quietly drains. The screenshots look great. The profit doesn't.
        </p>
        <p>
          That's why SellHive runs the opposite way. I'm the founder and I'm the operator in your campaigns. I've
          run a 40-person team, trained more than 50 specialists, and held a $652K quarter at ~5% TACOS through
          losses, team splits and a thousand deleted listings. I know what it takes to keep net profit real.
        </p>
        <p>
          I take on a limited number of accounts because delivery quality is the whole business. If your niche
          can't win, I'll tell you — and walk away rather than take your money.
        </p>
        <p>
          If you're tired of revenue that doesn't end up in your pocket, let's find out what your account is
          actually leaking. It's free, it's yours to keep, and you'll see the math before you spend a cent.
        </p>

        <div className="signature">
          <strong>Ishfaq Ahmad</strong>
          <span>Founder, SellHive</span>
        </div>

        <div className="hero-actions">
          <Link to="/audit" className="btn btn-primary btn-xl">Book a Free Strategy Call</Link>
        </div>
      </div>
    </section>
  )
}
