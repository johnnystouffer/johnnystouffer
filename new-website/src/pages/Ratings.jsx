import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import BlogParser from '../components/BlogParser.jsx'
import { formatDateShort } from '../utils/blogs.js'
import { ratings } from '../utils/ratings.js'
import './css/Blogs.css'
import './css/Ratings.css'

const SORTS = {
    newest: { label: 'Newest', fn: (a, b) => new Date(b.meta.date) - new Date(a.meta.date) },
    oldest: { label: 'Oldest', fn: (a, b) => new Date(a.meta.date) - new Date(b.meta.date) },
    highest: { label: 'Highest', fn: (a, b) => b.meta.rating - a.meta.rating },
    lowest: { label: 'Lowest', fn: (a, b) => a.meta.rating - b.meta.rating },
    'title-asc': { label: 'Title A–Z', fn: (a, b) => (a.meta.title ?? a.slug).localeCompare(b.meta.title ?? b.slug) },
}

// Square art for music, poster shape for everything else.
const SQUARE_TYPES = new Set(['song', 'album', 'podcast'])

const formatRating = (n) => (Number.isFinite(n) ? `${+n.toFixed(1)}` : '–')

function RatingRow({ slug, meta, markdown, open, onToggle }) {
    const panelId = `rating-${slug}`
    const details = [meta.type, meta.creator, meta.year].filter(Boolean).join(' · ')
    const shape = SQUARE_TYPES.has(meta.type) ? 'is-square' : 'is-poster'

    return (
        <li className={`ratings-item${open ? ' is-open' : ''}`}>
            <button
                type="button"
                className="ratings-row"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={onToggle}
            >
                <span className="ratings-row-marker" aria-hidden="true" />
                <time className="ratings-row-date">{formatDateShort(meta.date)}</time>
                <span className="ratings-row-title">
                    {meta.title ?? slug}
                    {meta.type && <span className="ratings-row-type">{meta.type}</span>}
                </span>
                <span className="ratings-row-score">{formatRating(meta.rating)}</span>
                <span className="ratings-row-plus" aria-hidden="true">{open ? '−' : '+'}</span>
            </button>

            {/* 0fr -> 1fr grid row animates the height without measuring it. */}
            <div id={panelId} className="ratings-panel" inert={!open}>
                <div className="ratings-panel-inner">
                    <div className="ratings-detail">
                        <div className={`ratings-media ${shape}`}>
                            {meta.image ? (
                                <img src={meta.image} alt={meta.alt ?? `${meta.title} artwork`} loading="lazy" />
                            ) : (
                                <span className="ratings-media-empty">{meta.type ?? 'No image'}</span>
                            )}
                        </div>

                        <div className="ratings-review">
                            <div className="ratings-review-head">
                                <div>
                                    <h3 className="ratings-review-title">{meta.title ?? slug}</h3>
                                    {details && <div className="ratings-review-meta">{details}</div>}
                                </div>
                                <div className="ratings-review-score">
                                    {formatRating(meta.rating)}
                                    <span>/10</span>
                                </div>
                            </div>
                            {meta.summary && <p className="ratings-review-summary">{meta.summary}</p>}
                            <BlogParser markdown={markdown} showHeader={false} />
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default function Ratings() {
    const [query, setQuery] = useState('')
    const [sort, setSort] = useState('newest')
    const [types, setTypes] = useState(() => new Set())
    const { hash } = useLocation()
    const [open, setOpen] = useState(() => new Set())

    // /ratings#slug (linked from the home page) opens that review and scrolls to it.
    useEffect(() => {
        const slug = decodeURIComponent(hash.slice(1))
        if (!slug) return
        setOpen((prev) => new Set(prev).add(slug))
        requestAnimationFrame(() =>
            document.getElementById(`rating-${slug}`)?.closest('li')?.scrollIntoView({ block: 'start', behavior: 'smooth' })
        )
    }, [hash])

    const typeCounts = useMemo(() => {
        const counts = new Map()
        for (const r of ratings) if (r.meta.type) counts.set(r.meta.type, (counts.get(r.meta.type) ?? 0) + 1)
        return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b))
    }, [])

    const toggleIn = (setter, value) =>
        setter((prev) => {
            const next = new Set(prev)
            if (next.has(value)) next.delete(value)
            else next.add(value)
            return next
        })

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase()
        return ratings
            .filter((r) => {
                if (types.size && !types.has(r.meta.type)) return false
                if (!q) return true
                return [r.meta.title, r.meta.creator, r.meta.type, r.meta.year, r.meta.summary, r.body]
                    .filter(Boolean).join(' ').toLowerCase().includes(q)
            })
            .sort(SORTS[sort].fn)
    }, [query, sort, types])

    return (
        <div className="blogs-page">
            <h1 className="blogs-heading">
                Ratings<sup className="blogs-heading-count">({visible.length})</sup>
            </h1>

            <p>
                Movies, shows, music and whatever else I've been into, scored out of 10. Click one for the full review.
            </p>

            <input
                type="search"
                className="blogs-search"
                placeholder="Search…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search ratings"
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
                                        <input type="radio" name="ratings-sort" value={k} checked={sort === k} onChange={() => setSort(k)} />
                                        {label}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {typeCounts.length > 0 && (
                        <div className="blogs-row-group">
                            <h3 className="blogs-group">Type</h3>
                            <ul className="blogs-options">
                                {typeCounts.map(([t, n]) => (
                                    <li key={t}>
                                        <label className="ratings-type-option">
                                            <input type="checkbox" checked={types.has(t)} onChange={() => toggleIn(setTypes, t)} />
                                            {t} <span className="blogs-option-count">({n})</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </aside>

                <section className="blogs-results">
                    <div className="ratings-columns">
                        <span className="blogs-label">Date</span>
                        <span className="blogs-label">Name</span>
                        <span className="blogs-label ratings-columns-score">Score</span>
                    </div>

                    {visible.length === 0 && (
                        <p className="blogs-empty">
                            {ratings.length === 0 ? 'No ratings yet.' : 'No ratings match.'}
                        </p>
                    )}

                    <ul className="ratings-list">
                        {visible.map((r) => (
                            <RatingRow
                                key={r.slug}
                                {...r}
                                open={open.has(r.slug)}
                                onToggle={() => toggleIn(setOpen, r.slug)}
                            />
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    )
}
