import useTheme from '../utils/useTheme.js'
import './css/ThemeToggle.css'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-pressed={isDark}
            aria-label={`Switch Theme [T]`}
        >
            <span aria-hidden="true">{isDark ? '☀' : '☾'}</span>
            {isDark ? 'LIGHT MODE' : 'DARK MODE'} [T]
        </button>
    )
}
