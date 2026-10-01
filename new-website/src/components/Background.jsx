import useTheme from '../utils/useTheme.js'
import './css/Background.css'

// Full-screen photo behind the site, one per theme. Both stay mounted so a
// theme switch never waits on a new image; useTheme crossfades the page.
export const BACKGROUNDS = {
  light: '/lightmode.jpg',
  dark: '/darkmode.jpg',
}

export default function Background() {
  const { theme } = useTheme()

  return (
    <div className="background" aria-hidden="true">
      {Object.entries(BACKGROUNDS).map(([name, src]) => (
        <div
          key={name}
          className={`bg-photo${theme === name ? ' is-active' : ''}`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
    </div>
  )
}
