import { useState } from 'react'
import { Link } from 'react-router-dom'
import './css/Navbar.css'

const links = [
  { to: '/', label: 'HOME' },
  { to: '/experience', label: 'EXPERIENCE' },
  { to: '/blog', label: 'BLOG' },
  { to: '/ratings', label: 'RATINGS' },
]

// Underline the first letter of each tab, like a menu-bar access key.
const renderLabel = (label) => (
  <>
    <span className="navbar-key">{label[0]}</span>
    {label.slice(1)}
  </>
)

export default function Navbar({ children }) {
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-name" onClick={() => setOpen(false)}>
        John H. Stouffer
      </Link>

      <ul className="navbar-links">
        {links.map(({ to, label }) => (
          <li key={to}>
            <Link to={to}>{renderLabel(label)}</Link>
          </li>
        ))}
      </ul>

      {children}

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
                {renderLabel(label)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
