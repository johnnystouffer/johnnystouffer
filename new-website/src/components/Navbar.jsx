import { useState } from 'react'
import { Link } from 'react-router-dom'
import './css/Navbar.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/experience', label: 'Experience' },
  { to: '/blog', label: 'Blog' },
  { to: '/ratings', label: 'Ratings' },
  { to: '/connect', label: 'Connect' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-name" onClick={() => setOpen(false)}>
        John H. Stouffer
      </Link>

      <ul className="navbar-links">
        {links.map(({ to, label }) => (
          <li key={to}>
            <Link to={to}>{label}</Link>
          </li>
        ))}
      </ul>

      <div
        type="button"
        className="navbar-toggle"
        aria-label="Menu"
        aria-expanded={open}
        aria-controls="navbar-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </div>

      {open && (
        <ul id="navbar-menu" className="navbar-menu">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link to={to} onClick={() => setOpen(false)}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
