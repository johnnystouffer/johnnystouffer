import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useTheme from './useTheme.js'

// key -> route, kept in sync with the shortcuts shown in Navbar.jsx labels
const SHORTCUTS = {
    h: '/',
    e: '/experience',
    b: '/blog',
    r: '/ratings',
}

export const isTypingTarget = (el) => {
    if (!el) return false
    const tag = el.tagName
    return (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        el.isContentEditable
    )
}

export default function useKeyboardNav() {
    const navigate = useNavigate()
    const { toggleTheme } = useTheme()

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.metaKey || e.ctrlKey || e.altKey) return
            if (isTypingTarget(e.target)) return

            const key = e.key.toLowerCase()

            if (key === 't') {
                e.preventDefault()
                toggleTheme()
                return
            }

            const to = SHORTCUTS[key]
            if (!to) return

            e.preventDefault()
            navigate(to)
        }

        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [navigate, toggleTheme])
}
