import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          Sell<span>Hive</span>
        </Link>

        <button
          className="menu-toggle"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        <nav className={`nav ${open ? 'open' : ''}`}>
          <NavLink to="/" end onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/services" onClick={() => setOpen(false)}>Services</NavLink>
          <NavLink to="/results" onClick={() => setOpen(false)}>Results</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
          <div className="header-cta">
            <Link to="/audit" className="btn btn-primary" onClick={() => setOpen(false)}>
              Book a Free Strategy Call
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
