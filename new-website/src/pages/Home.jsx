import useTheme from '../utils/useTheme.js'
import art from '../assets/home-art.txt?raw'

import './css/Home.css'

// 24x24 icons, drawn in the link color so they follow the theme.
const ICONS = {
    email: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
        </svg>
    ),
    linkedin: (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
        </svg>
    ),
    github: (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .3" />
        </svg>
    ),
    resume: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
            <path d="M14 3v5h5M9 13h6M9 17h6" />
        </svg>
    ),
    sun: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
    ),
    moon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    ),
}

const CONTACTS = [
    ['Email', 'email', 'mailto:johnstouffer18@msu.edu'],
    ['LinkedIn', 'linkedin', 'https://www.linkedin.com/in/johnny-stouffer/'],
    ['GitHub', 'github', 'https://github.com/johnnystouffer'],
    ['Resume (PDF)', 'resume', '/John_Stouffer_Resume_Master.pdf'],
]

export default function Home() {
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === 'dark'
    const themeLabel = `Switch Theme [T]`

    return (
        <div className="home">
            <div className="home-art" aria-hidden="true">
                <pre>{art.trimEnd()}</pre>
            </div>

            <h1 className="home-name">John Stouffer</h1>
            <span className="home-rule" aria-hidden="true" />

            <p className="home-role">Software Engineer @ Collins Aerospace</p>

            <p className="home-intro">
                Geography Nut · Ancient History Nerd · Minecraft Fiend · Tech Junkie
            </p>
            <ul className="home-contacts">
                {CONTACTS.map(([label, icon, href]) => (
                    <li key={icon}>
                        <a
                            href={href}
                            aria-label={label}
                            title={label}
                            {...(href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noreferrer' })}
                        >
                            {ICONS[icon]}
                        </a>
                    </li>
                ))}
                <li>
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-pressed={isDark}
                        aria-label={themeLabel}
                        title={themeLabel}
                    >
                        {ICONS[isDark ? 'sun' : 'moon']}
                    </button>
                </li>
            </ul>
        </div>
    )
}
