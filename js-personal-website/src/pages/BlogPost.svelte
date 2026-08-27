<script lang="ts">
  import { getBlog, formatDate } from '../lib/blogs'
  import { link } from '../lib/router.svelte'

  interface Props {
    slug: string
  }
  let { slug }: Props = $props()

  const post = $derived(getBlog(slug))
</script>

<main class="page">
  <a class="back" href="/blogs" onclick={(e) => link(e, '/blogs')}>← All posts</a>

  {#if post}
    <article>
      <header class="head">
        <h1>{post.title}</h1>
        <div class="meta">
          {#if post.author}<span>{post.author}</span>{/if}
          {#if post.date}<span>·</span><time>{formatDate(post.date)}</time>{/if}
        </div>
        {#if post.tags.length}
          <div class="tags">
            {#each post.tags as tag}<span class="tag">{tag}</span>{/each}
          </div>
        {/if}
      </header>
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      <div class="prose">{@html post.html}</div>
    </article>
  {:else}
    <p class="missing">Post not found.</p>
  {/if}
</main>

<style>
  .page {
    max-width: 760px;
    margin: 0 auto;
    padding: 40px 24px 96px;
    min-height: calc(100svh - 65px);
    box-sizing: border-box;
    /* prevent any wide child (code, long words) from stretching the page */
    overflow-wrap: break-word;

    @media (max-width: 640px) {
      padding: 28px 18px 72px;
    }
  }

  .back {
    display: inline-block;
    margin-bottom: 24px;
    font-family: var(--mono);
    font-size: 14px;
    color: var(--accent);
    text-decoration: none;
  }
  .back:hover {
    color: var(--accent-hover);
  }

  .head {
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border);
  }
  .head h1 {
    margin: 0 0 12px;
  }

  .meta {
    display: flex;
    gap: 8px;
    font-family: var(--mono);
    font-size: 14px;
    color: var(--text);
    opacity: 0.75;
    margin-bottom: 12px;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .tag {
    font-family: var(--mono);
    font-size: 12px;
    padding: 3px 8px;
    border-radius: 20px;
    color: var(--accent);
    background: color-mix(in srgb, var(--accent) 12%, transparent);
  }

  .missing {
    color: var(--text);
    opacity: 0.7;
  }

  /* markdown output styling */
  .prose {
    min-width: 0;
  }
  .prose :global(h1),
  .prose :global(h2),
  .prose :global(h3) {
    color: var(--text-h);
    margin: 32px 0 12px;
    line-height: 1.25;
  }
  .prose :global(h2) {
    font-size: 26px;
    @media (max-width: 640px) {
      font-size: 22px;
    }
  }
  .prose :global(h3) {
    font-size: 20px;
  }
  .prose :global(p) {
    margin: 0 0 18px;
    line-height: 1.7;
  }
  .prose :global(a) {
    color: var(--accent);
    text-decoration: underline;
  }
  .prose :global(a:hover) {
    color: var(--accent-hover);
  }
  .prose :global(ul),
  .prose :global(ol) {
    margin: 0 0 18px;
    padding-left: 24px;
    line-height: 1.7;
  }
  .prose :global(code) {
    font-family: var(--mono);
    font-size: 14px;
    padding: 2px 6px;
    border-radius: 4px;
    background: color-mix(in srgb, var(--text) 10%, transparent);
  }
  .prose :global(pre) {
    background: color-mix(in srgb, var(--text) 8%, transparent);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 16px 18px;
    max-width: 100%;
    overflow-x: auto;
    margin: 0 0 20px;
  }
  .prose :global(pre code) {
    background: none;
    padding: 0;
    font-size: 14px;
    line-height: 1.6;
  }
  .prose :global(blockquote) {
    margin: 0 0 18px;
    padding-left: 16px;
    border-left: 3px solid var(--accent);
    color: var(--text);
    opacity: 0.85;
  }
  .prose :global(img) {
    max-width: 100%;
    border-radius: 10px;
  }
</style>
