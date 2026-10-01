import { useCallback, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'theme'

const getSystemTheme = () =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const getStoredTheme = () => {
    try {
        return localStorage.getItem(STORAGE_KEY)
    } catch {
        return null
    }
}

const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme
    try {
        localStorage.setItem(STORAGE_KEY, theme)
    } catch {
        // ignore (private mode / blocked storage)
    }
}

// module-level store so every component using useTheme stays in sync,
// no matter which one triggers the change (button click, keyboard shortcut, etc.)
let theme = getStoredTheme() ?? getSystemTheme()
applyTheme(theme)

const listeners = new Set()

const commitTheme = (next) => {
    theme = next
    applyTheme(theme)
    listeners.forEach((listener) => listener())
}

// Crossfade the whole page (colors and background photo together) with the
// View Transitions API where it's supported; otherwise switch instantly.
const setTheme = (next) => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduceMotion) {
        commitTheme(next)
        return
    }
    document.startViewTransition(() => commitTheme(next))
}

const subscribe = (listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
}

const getSnapshot = () => theme

export default function useTheme() {
    const current = useSyncExternalStore(subscribe, getSnapshot)

    const toggleTheme = useCallback(() => {
        setTheme(current === 'dark' ? 'light' : 'dark')
    }, [current])

    return { theme: current, toggleTheme }
}
