import './css/Background.css'

// Full-screen wallpaper behind the site. The pattern is a mask filled with
// --pattern-color, so it follows the theme without a second asset.

export default function Background() {
  return <div className="background" aria-hidden="true" />
}
