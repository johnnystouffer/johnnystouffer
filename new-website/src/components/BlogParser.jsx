import React from 'react'
import { parseFrontmatter, formatDate } from '../utils/blogs.js'
import './css/BlogParser.css'

// ---------- code block with copy button ----------

function CodeBlock({ lang, source, highlighted }) {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(source)
        } catch {
            return
        }
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    return (
        <pre className="blog-code" data-lang={lang || undefined}>
            <button
                type="button"
                className={`blog-code-copy${copied ? ' copied' : ''}`}
                onClick={handleCopy}
                aria-label={copied ? 'Copied!' : 'Copy code'}
                title={copied ? 'Copied!' : 'Copy code'}
            >
                {copied ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                )}
            </button>
            <code className={lang ? `language-${lang}` : undefined}>{highlighted}</code>
        </pre>
    )
}

// ---------- inline parsing ----------

const INLINE_RE =
    /(!\[([^\]]*)\]\(([^)\s]+)\))|(\[([^\]]+)\]\(([^)\s]+)\))|(`([^`]+)`)|(\*\*\*(.+?)\*\*\*)|(\*\*(.+?)\*\*)|(\*(.+?)\*)|(~~(.+?)~~)/

function parseInline(text, keyPrefix = 'i') {
    const nodes = []
    let rest = text
    let i = 0

    while (rest.length) {
        const m = rest.match(INLINE_RE)
        if (!m) {
            nodes.push(rest)
            break
        }
        if (m.index > 0) nodes.push(rest.slice(0, m.index))
        const key = `${keyPrefix}-${i++}`

        if (m[1]) {
            nodes.push(<img key={key} src={m[3]} alt={m[2]} className="blog-img" />)
        } else if (m[4]) {
            nodes.push(
                <a key={key} href={m[6]} target="_blank" rel="noopener noreferrer">
                    {parseInline(m[5], key)}
                </a>
            )
        } else if (m[7]) {
            nodes.push(<code key={key} className="blog-inline-code">{m[8]}</code>)
        } else if (m[9]) {
            nodes.push(<strong key={key}><em>{parseInline(m[10], key)}</em></strong>)
        } else if (m[11]) {
            nodes.push(<strong key={key}>{parseInline(m[12], key)}</strong>)
        } else if (m[13]) {
            nodes.push(<em key={key}>{parseInline(m[14], key)}</em>)
        } else if (m[15]) {
            nodes.push(<del key={key}>{parseInline(m[16], key)}</del>)
        }
        rest = rest.slice(m.index + m[0].length)
    }
    return nodes
}

// ---------- code highlighting ----------

const KEYWORDS = new Set((
    'async await break case catch class const continue debugger default delete do else enum export extends ' +
    'false finally for from function if implements import in instanceof interface let new null of package private ' +
    'protected public return static super switch this throw true try typeof undefined var void while with yield ' +
    'def elif except lambda pass raise None True False and or not is print self fn pub mut impl struct match use ' +
    'int float double char bool string void long short unsigned signed include using namespace std'
).split(' '))

const TOKEN_RE =
    /(\/\/.*|\/\*[\s\S]*?\*\/|#.*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)(?=\s*\()|([A-Za-z_$][\w$]*)|([{}()[\];,.]|=>|[+\-*/%=<>!&|?:]+)/g

function highlight(code, keyPrefix) {
    const out = []
    let last = 0
    let i = 0
    for (const m of code.matchAll(TOKEN_RE)) {
        if (m.index > last) out.push(code.slice(last, m.index))
        const key = `${keyPrefix}-${i++}`
        if (m[1]) out.push(<span key={key} className="tok-comment">{m[1]}</span>)
        else if (m[2]) out.push(<span key={key} className="tok-string">{m[2]}</span>)
        else if (m[3]) out.push(<span key={key} className="tok-number">{m[3]}</span>)
        else if (m[4]) out.push(<span key={key} className={KEYWORDS.has(m[4]) ? 'tok-keyword' : 'tok-function'}>{m[4]}</span>)
        else if (m[5]) out.push(KEYWORDS.has(m[5]) ? <span key={key} className="tok-keyword">{m[5]}</span> : m[5])
        else if (m[6]) out.push(<span key={key} className="tok-punct">{m[6]}</span>)
        last = m.index + m[0].length
    }
    if (last < code.length) out.push(code.slice(last))
    return out
}

// ---------- block parsing ----------

const isBlank = (l) => l.trim() === ''
const isHr = (l) => /^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(l)
const isHeading = (l) => /^#{1,6}\s/.test(l)
const isUl = (l) => /^\s*[-*+]\s+/.test(l)
const isOl = (l) => /^\s*\d+[.)]\s+/.test(l)
const isQuote = (l) => /^\s*>/.test(l)
const isFence = (l) => /^\s*```/.test(l)
const isTableRow = (l) => /^\s*\|.*\|\s*$/.test(l)
const isTableSep = (l) => /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/.test(l)

function splitCells(line) {
    return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim())
}

function parseBlocks(lines) {
    const out = []
    let i = 0
    let k = 0
    const key = () => `b-${k++}`

    while (i < lines.length) {
        const line = lines[i]

        if (isBlank(line)) { i++; continue }

        // fenced code
        if (isFence(line)) {
            const lang = line.trim().slice(3).trim()
            const code = []
            i++
            while (i < lines.length && !isFence(lines[i])) code.push(lines[i++])
            i++ // closing fence
            const source = code.join('\n')
            out.push(
                <CodeBlock key={key()} lang={lang} source={source} highlighted={highlight(source, key())} />
            )
            continue
        }

        if (isHr(line)) { out.push(<hr key={key()} className="blog-hr" />); i++; continue }

        if (isHeading(line)) {
            const level = line.match(/^#+/)[0].length
            const Tag = `h${level}`
            out.push(<Tag key={key()} className={`blog-h blog-h${level}`}>{parseInline(line.slice(level).trim())}</Tag>)
            i++
            continue
        }

        if (isQuote(line)) {
            const inner = []
            while (i < lines.length && isQuote(lines[i])) inner.push(lines[i++].replace(/^\s*>\s?/, ''))
            out.push(<blockquote key={key()} className="blog-quote">{parseBlocks(inner)}</blockquote>)
            continue
        }

        if (isTableRow(line) && i + 1 < lines.length && isTableSep(lines[i + 1])) {
            const header = splitCells(line)
            const aligns = splitCells(lines[i + 1]).map((c) =>
                c.startsWith(':') && c.endsWith(':') ? 'center' : c.endsWith(':') ? 'right' : 'left'
            )
            i += 2
            const rows = []
            while (i < lines.length && isTableRow(lines[i])) rows.push(splitCells(lines[i++]))
            out.push(
                <div key={key()} className="blog-table-wrap">
                    <table className="blog-table">
                        <thead>
                            <tr>{header.map((c, ci) => <th key={ci} style={{ textAlign: aligns[ci] }}>{parseInline(c)}</th>)}</tr>
                        </thead>
                        <tbody>
                            {rows.map((r, ri) => (
                                <tr key={ri}>{r.map((c, ci) => <td key={ci} style={{ textAlign: aligns[ci] }}>{parseInline(c)}</td>)}</tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
            continue
        }

        if (isUl(line) || isOl(line)) {
            const ordered = isOl(line)
            const test = ordered ? isOl : isUl
            const items = []
            while (i < lines.length && test(lines[i])) {
                let text = lines[i].replace(ordered ? /^\s*\d+[.)]\s+/ : /^\s*[-*+]\s+/, '')
                i++
                // continuation lines (indented, non-list, non-blank)
                while (i < lines.length && !isBlank(lines[i]) && /^\s{2,}/.test(lines[i]) && !test(lines[i])) {
                    text += ' ' + lines[i++].trim()
                }
                const task = text.match(/^\[([ xX])\]\s+(.*)$/)
                items.push(
                    task ? (
                        <li key={items.length} className="blog-task">
                            <input type="checkbox" checked={task[1] !== ' '} readOnly />
                            <span>{parseInline(task[2])}</span>
                        </li>
                    ) : (
                        <li key={items.length}>{parseInline(text)}</li>
                    )
                )
            }
            const Tag = ordered ? 'ol' : 'ul'
            out.push(<Tag key={key()} className="blog-list">{items}</Tag>)
            continue
        }

        // paragraph: gather until blank line or another block start
        const para = []
        while (
            i < lines.length &&
            !isBlank(lines[i]) &&
            !isHeading(lines[i]) && !isHr(lines[i]) && !isFence(lines[i]) &&
            !isQuote(lines[i]) && !isUl(lines[i]) && !isOl(lines[i]) &&
            !(isTableRow(lines[i]) && i + 1 < lines.length && isTableSep(lines[i + 1]))
        ) {
            para.push(lines[i++].trim())
        }
        if (para.length) out.push(<p key={key()} className="blog-p">{parseInline(para.join(' '))}</p>)
    }
    return out
}

// ---------- component ----------

export default function BlogParser({ markdown, showHeader = true }) {
    const { meta, body } = React.useMemo(() => parseFrontmatter(markdown ?? ''), [markdown])
    const blocks = React.useMemo(() => parseBlocks(body.split(/\r?\n/)), [body])

    const date = formatDate(meta.date)

    return (
        <article className="blog">
            {showHeader && (
                <header className="blog-header">
                    {Array.isArray(meta.tags) && meta.tags.length > 0 && (
                        <ul className="blog-tags">
                            {meta.tags.map((t) => <li key={t}>{t}</li>)}
                        </ul>
                    )}
                    {meta.title && <h1 className="blog-title">{meta.title}</h1>}
                    {meta.description && <p className="blog-description">{meta.description}</p>}
                    <div className="blog-meta">
                        {meta.author && <span className="blog-author">{meta.author}</span>}
                        {date && <time className="blog-date">{date}</time>}
                    </div>
                    {meta.image && <img className="blog-cover" src={meta.image} alt={meta.alt ?? ''} />}
                </header>
            )}
            <div className="blog-body">{blocks}</div>
        </article>
    )
}
