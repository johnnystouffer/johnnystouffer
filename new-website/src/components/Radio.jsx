import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { isTypingTarget } from '../utils/useKeyboardNav.js'
import './css/Radio.css'

// Fixed per-bar timings so the visualizer looks random but stays stable
// between renders.
const BARS = Array.from({ length: 16 }, (_, i) => ({
  duration: 0.7 + ((i * 37) % 11) / 20,
  delay: -((i * 53) % 17) / 20,
  peak: 0.45 + ((i * 29) % 13) / 24,
}))

// How long "connecting" lasts when there's no audio to wait on.
const FAKE_CONNECT_MS = 900

const STATUS_LABELS = {
  disconnected: 'Disconnected',
  connecting: 'Connecting',
  connected: 'Connected',
}

export default function Radio({ image, alt = '', title, artist, src }) {
  const [open, setOpen] = useState(false)
  // disconnected -> connecting -> connected
  const [status, setStatus] = useState('disconnected')
  const [volume, setVolume] = useState(60)
  const audioRef = useRef(null)

  const toggleConnection = () =>
    setStatus((s) => (s === 'disconnected' ? 'connecting' : 'disconnected'))

  // Keep the <audio> element in step with the connection. With audio, the
  // element's own events move us to "connected"; without, a short delay does.
  useEffect(() => {
    const audio = audioRef.current

    if (status === 'disconnected') {
      audio?.pause()
      return
    }
    if (status !== 'connecting') return

    if (audio) {
      audio.play().catch(() => setStatus('disconnected'))
      return
    }
    const id = setTimeout(() => setStatus('connected'), FAKE_CONNECT_MS)
    return () => clearTimeout(id)
  }, [status])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100
  }, [volume])

  // M toggles the radio, C connects/disconnects while it's open, Escape
  // closes it.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (isTypingTarget(e.target)) return

      const key = e.key.toLowerCase()
      if (key === 'm') {
        e.preventDefault()
        setOpen((o) => !o)
      } else if (key === 'c' && open) {
        e.preventDefault()
        toggleConnection()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

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
          className={`radio is-${status}${open ? ' is-open' : ''}`}
          inert={!open}
        >
          <div className="radio-image">
            <img src={image} alt={alt} />
          </div>
          <div className="radio-body">
            <div className="radio-label">
              <span className="radio-tag">Radio</span>
              <button
                type="button"
                className="radio-close"
                aria-label="Close radio"
                onClick={() => setOpen(false)}
              >
                Close <span className="radio-key">[Esc]</span>
              </button>
            </div>

            {/* Middle: title + artist on the left, the visualizer boxed
                on the right. */}
            <div className="radio-middle">
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
            </div>

            <div className="radio-controls">
              <button
                type="button"
                className="radio-connect"
                aria-pressed={status !== 'disconnected'}
                aria-live="polite"
                onClick={toggleConnection}
              >
                <span className="radio-status-dot" aria-hidden="true" />
                {STATUS_LABELS[status]}
                <span className="radio-key">[C]</span>
              </button>

              <label className="radio-volume">
                <span>Vol</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  style={{ '--fill': `${volume}%` }}
                />
              </label>
            </div>
          </div>

          {src && (
            <audio
              ref={audioRef}
              src={src}
              loop
              preload="none"
              onWaiting={() => setStatus((s) => (s === 'connected' ? 'connecting' : s))}
              onPlaying={() => setStatus((s) => (s === 'disconnected' ? s : 'connected'))}
            />
          )}
        </div>,
        document.body,
      )}
    </>
  )
}
