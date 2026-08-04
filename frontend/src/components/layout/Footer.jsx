import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-cta">
          <h2>Every month you wait, the leak keeps running.</h2>
          <p>We'll show you exactly what your account is losing — in dollars, on your own data — before you spend a cent.</p>
          <Link to="/audit" className="btn btn-primary">Book a Free Strategy Call</Link>
        </div>

        <div className="footer-grid">
          <div>
            <Link to="/" className="logo">Sell<span>Hive</span></Link>
            <p style={{ marginTop: 12, maxWidth: 34, lineHeight: 1.6 }}>Amazon growth, measured in net profit. Full account and advertising management for private-label brands.</p>
          </div>
          <div>
            <h4>Pages</h4>
            <Link to="/services">Services</Link>
            <Link to="/results">Results</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div>
            <h4>Services</h4>
            <Link to="/services">Lower Your ACoS</Link>
            <Link to="/services">Scale Profitable Campaigns</Link>
            <Link to="/services">Fix What Happens After the Click</Link>
          </div>
          <div>
            <h4>Start here</h4>
            <Link to="/audit">Free account audit</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About the founder</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 SellHive. All rights reserved.</span>
          <span>Founded by Ishfaq Ahmad</span>
        </div>
      </div>
    </footer>
  )
}
