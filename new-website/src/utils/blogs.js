const files = import.meta.glob('/src/assets/blogs/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
})

// Parses the YAML-ish frontmatter block at the top of a markdown file.
export function parseFrontmatter(markdown) {
    const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
    if (!match) return { meta: {}, body: markdown }

    const meta = {}
    for (const line of match[1].split(/\r?\n/)) {
        const idx = line.indexOf(':')
        if (idx === -1) continue
        const key = line.slice(0, idx).trim()
        let value = line.slice(idx + 1).trim()

        if (value.startsWith('[') && value.endsWith(']')) {
            value = value
                .slice(1, -1)
                .split(',')
                .map((s) => s.trim().replace(/^["']|["']$/g, ''))
                .filter(Boolean)
        } else if (value === 'true' || value === 'false') {
            value = value === 'true'
        } else {
            value = value.replace(/^["']|["']$/g, '')
        }
        meta[key] = value
    }
    return { meta, body: markdown.slice(match[0].length) }
}

// Formats a YYYY-MM-DD frontmatter date without the UTC-offset shift.
export function formatDate(value) {
    if (!value) return null
    const m = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/)
    const d = m ? new Date(+m[1], +m[2] - 1, +m[3]) : new Date(value)
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}

// Compact YYYY.M.DD form used in list views.
export function formatDateShort(value) {
    const m = String(value ?? '').match(/^(\d{4})-(\d{2})-(\d{2})/)
    if (!m) return ''
    return `${m[1]}.${+m[2]}.${m[3]}`
}

export const blogs = Object.entries(files)
    .map(([path, markdown]) => {
        const slug = path.split('/').pop().replace(/\.md$/, '')
        const { meta, body } = parseFrontmatter(markdown)
        return { slug, meta, body, markdown }
    })
    .filter((b) => !b.meta.draft)
    .sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))

export function getBlog(slug) {
    return blogs.find((b) => b.slug === slug)
}
