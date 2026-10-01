import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { isTypingTarget } from '../utils/useKeyboardNav.js'
import './css/Radio.css'

// Fixed per-bar timings so the visualizer looks random but stays stable
// between renders.
const BARS = Array.from({ length: 28 }, (_, i) => ({
  duration: 0.7 + ((i * 37) % 11) / 20,
  delay: -((i * 53) % 17) / 20,
  peak: 0.45 + ((i * 29) % 13) / 24,
}))

export default function Radio({ image, alt = '', title, artist }) {
  const [open, setOpen] = useState(false)

  // M toggles the radio, Escape closes it.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (isTypingTarget(e.target)) return
      if (e.key.toLowerCase() !== 'm') return

      e.preventDefault()
      setOpen((o) => !o)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      {/* Tab that hangs off the bottom of the navbar. */}
      <button
        type="button"
        className={`radio-toggle${open ? ' is-open' : ''}`}
        aria-expanded={open}
        aria-controls="radio-panel"
        onClick={() => setOpen((o) => !o)}
      >
        RADIO [M]
      </button>

      {/* The navbar's backdrop-filter traps position: fixed children, so the
          panel renders on <body> to stay pinned to the viewport. */}
      {createPortal(
        <div
          id="radio-panel"
          className={`radio${open ? ' is-open' : ''}`}
          inert={!open}
        >
          <div className="radio-image">
            <img src={image} alt={alt} />
          </div>
          <div className="radio-body">
            <div className="radio-label">
              <button
                type="button"
                className="radio-close"
                aria-label="Close radio"
                onClick={() => setOpen(false)}
              >
                Close [Esc]
              </button>
            </div>

            <div className="radio-info">
              <div className="radio-title">{title}</div>
              <div className="radio-artist">{artist}</div>
            </div>

            <div className="radio-bars" aria-hidden="true">
              {BARS.map((bar, i) => (
                <span
                  key={i}
                  style={{
                    '--duration': `${bar.duration}s`,
                    '--delay': `${bar.delay}s`,
                    '--peak': bar.peak,
                  }}
                />
              ))}
            </div>

            <div className="radio-footer" aria-hidden="true">
              <span>RADIO [M]</span>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
