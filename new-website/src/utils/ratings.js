import { parseFrontmatter } from './blogs.js'

// Each review is a markdown file in src/assets/ratings with frontmatter:
//   title, type (movie | show | song | album | book | game | ...), creator,
//   year, rating (out of 10), date (YYYY-MM-DD, when you reviewed it),
//   image (a filename in src/assets/ratings/images, or a full URL), summary.
const files = import.meta.glob('/src/assets/ratings/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
})

const images = import.meta.glob('/src/assets/ratings/images/*.{jpg,jpeg,png,webp,gif,avif}', {
    query: '?url',
    import: 'default',
    eager: true,
})

const resolveImage = (value) => {
    if (!value) return null
    if (/^(https?:)?\/\//.test(value) || value.startsWith('/')) return value
    return images[`/src/assets/ratings/images/${value}`] ?? null
}

export const ratings = Object.entries(files)
    .map(([path, markdown]) => {
        const slug = path.split('/').pop().replace(/\.md$/, '')
        const { meta, body } = parseFrontmatter(markdown)
        return {
            slug,
            meta: { ...meta, rating: Number(meta.rating), image: resolveImage(meta.image) },
            body,
            markdown,
        }
    })
    .filter((r) => !r.meta.draft)
    .sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))
