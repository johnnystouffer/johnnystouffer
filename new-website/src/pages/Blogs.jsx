import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { blogs, formatDateShort } from '../utils/blogs.js'
import './css/Blogs.css'

const SORTS = {
    newest: { label: 'Newest', fn: (a, b) => new Date(b.meta.date) - new Date(a.meta.date) },
    oldest: { label: 'Oldest', fn: (a, b) => new Date(a.meta.date) - new Date(b.meta.date) },
    'title-asc': { label: 'Title A–Z', fn: (a, b) => (a.meta.title ?? a.slug).localeCompare(b.meta.title ?? b.slug) },
    'title-desc': { label: 'Title Z–A', fn: (a, b) => (b.meta.title ?? b.slug).localeCompare(a.meta.title ?? a.slug) },
}

export default function Blogs() {
    const [query, setQuery] = useState('')
    const [sort, setSort] = useState('newest')
    const [tags, setTags] = useState(() => new Set())

    const tagCounts = useMemo(() => {
        const counts = new Map()
        for (const b of blogs) for (const t of b.meta.tags ?? []) counts.set(t, (counts.get(t) ?? 0) + 1)
        return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b))
    }, [])

    const toggleTag = (t) =>
        setTags((prev) => {
            const next = new Set(prev)
            if (next.has(t)) next.delete(t)
            else next.add(t)
            return next
        })

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase()
        return blogs
            .filter((b) => {
                const bt = b.meta.tags ?? []
                if (tags.size && ![...tags].some((t) => bt.includes(t))) return false
                if (!q) return true
                return [b.meta.title, b.meta.description, b.meta.author, ...bt, b.body]
                    .filter(Boolean).join(' ').toLowerCase().includes(q)
            })
            .sort(SORTS[sort].fn)
    }, [query, sort, tags])

    return (
        <div className="blogs-page">
            <h1 className="blogs-heading">
                Blog<sup className="blogs-heading-count">({visible.length})</sup>
            </h1>

            <p>
                I will post about random projects, opinions, things I find interesting, and other stuff I have learned. 
            </p>
            <p>
                <i>Usual Topics: Software Development, Tech, Politics, Economics, Random nerdy stuff</i>
            </p>

            <input
                type="search"
                className="blogs-search"
                placeholder="Search…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search blogs"
            />

            <div className="blogs-layout">
                <aside className="blogs-filters">
                    <h2 className="blogs-label">Filters</h2>
                    <div className="blogs-row-group">
                        <h3 className="blogs-group">Sort</h3>
                        <ul className="blogs-options">
                            {Object.entries(SORTS).map(([k, { label }]) => (
                                <li key={k}>
                                    <label>
                                        <input type="radio" name="sort" value={k} checked={sort === k} onChange={() => setSort(k)} />
                                        {label}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {tagCounts.length > 0 && (
                        <div className="blogs-row-group">
                            <h3 className="blogs-group">Topic</h3>
                            <ul className="blogs-options">
                                {tagCounts.map(([t, n]) => (
                                    <li key={t}>
                                        <label>
                                            <input type="checkbox" checked={tags.has(t)} onChange={() => toggleTag(t)} />
                                            {t} <span className="blogs-option-count">({n})</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </aside>

                <section className="blogs-results">
                    <div className="blogs-columns">
                        <span className="blogs-label">Date</span>
                        <span className="blogs-label">Name</span>
                    </div>

                    {visible.length === 0 && (
                        <p className="blogs-empty">
                            {blogs.length === 0 ? 'No blogs yet.' : 'No blogs match.'}
                        </p>
                    )}

                    <ul className="blogs-list">
                        {visible.map(({ slug, meta }) => (
                            <li key={slug}>
                                <Link to={`/blog/${slug}`} className="blogs-row">
                                    <span className="blogs-row-marker" aria-hidden="true" />
                                    <time className="blogs-row-date">{formatDateShort(meta.date)}</time>
                                    <span className="blogs-row-title">{meta.title ?? slug}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    )
}
