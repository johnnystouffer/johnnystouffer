import { marked } from 'marked'

export interface Blog {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  author: string
  html: string
}

// Eagerly load every markdown file in assets/blogs as a raw string.
const files = import.meta.glob('../assets/blogs/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function stripQuotes(value: string): string {
  return value.replace(/^['"]|['"]$/g, '').trim()
}

// Tiny frontmatter parser: handles `key: value` pairs and simple `- item` lists.
function parseFrontmatter(raw: string): { data: Record<string, unknown>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, body: raw }

  const data: Record<string, unknown> = {}
  const lines = match[1].split(/\r?\n/)
  let currentListKey: string | null = null

  for (const line of lines) {
    if (/^\s*-\s+/.test(line) && currentListKey) {
      ;(data[currentListKey] as string[]).push(stripQuotes(line.replace(/^\s*-\s+/, '')))
      continue
    }
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (kv) {
      const key = kv[1]
      const value = kv[2]
      if (value === '') {
        currentListKey = key
        data[key] = []
      } else {
        currentListKey = null
        data[key] = stripQuotes(value)
      }
    }
  }

  return { data, body: match[2] }
}

function slugFromPath(path: string): string {
  return path.split('/').pop()!.replace(/\.md$/, '')
}

export const blogs: Blog[] = Object.entries(files)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw)
    return {
      slug: slugFromPath(path),
      title: (data.title as string) ?? slugFromPath(path),
      description: (data.description as string) ?? '',
      date: (data.date as string) ?? '',
      tags: (data.tags as string[]) ?? [],
      author: (data.author as string) ?? '',
      html: marked.parse(body, { async: false }) as string,
    }
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export function getBlog(slug: string): Blog | undefined {
  return blogs.find((b) => b.slug === slug)
}

export function formatDate(date: string): string {
  if (!date) return ''
  const d = new Date(date)
  if (isNaN(d.getTime())) return date
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
