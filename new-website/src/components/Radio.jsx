import { useState } from 'react'
import './css/Radio.css'

import RadioSvg from './assets/RadioSvg.jsx'

export default function Radio({ image, alt = '', title, description }) {
  const [open, setOpen] = useState(false)

  if (!open) {
    return (
      <button
        type="button"
        className="radio-toggle"
        aria-label="Open radio"
        onClick={() => setOpen(true)}
      >
        <RadioSvg />
      </button>
    )
  }

  return (
    <div className="radio">
      <div className="radio-image">
        <img src={image} alt={alt} />
      </div>
      <div className="radio-body">
        <div className="radio-title">{title}</div>
        <div className="radio-description">{description}</div>
      </div>
      <button
        type="button"
        className="radio-close"
        aria-label="Close radio"
        onClick={() => setOpen(false)}
      >
        &times;
      </button>
    </div>
  )
}
