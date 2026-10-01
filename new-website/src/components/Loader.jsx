import { useState } from 'react'
import './css/Loader.css'

// Covers the screen until the background photos are decoded, then fades out
// and unmounts.
export default function Loader({ loaded, total, done }) {
  const [gone, setGone] = useState(false)
  if (gone) return null

  return (
    <div
      className={`loader${done ? ' is-done' : ''}`}
      role="status"
      aria-live="polite"
      onTransitionEnd={(e) => {
        if (done && e.target === e.currentTarget) setGone(true)
      }}
    >
      <div className="loader-inner">
        <div className="loader-label">
          <span className="loader-marker" aria-hidden="true" />
          <span>Loading</span>
          <span className="loader-count">
            {loaded}/{total}
          </span>
        </div>
        <div className="loader-track" aria-hidden="true">
          <span style={{ '--progress': total ? loaded / total : 1 }} />
        </div>
      </div>
    </div>
  )
}
