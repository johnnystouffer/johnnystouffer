<script lang="ts">
  import PageShell from '../lib/PageShell.svelte'
  import { blogs, formatDate } from '../lib/blogs'
  import { link } from '../lib/router.svelte'
</script>

<PageShell title="Blogs" subtitle="Writing on random weekend projects, hobbies, and whatever I randomly research at 3am.">
  {#if blogs.length === 0}
    <p class="empty">No posts yet — check back soon.</p>
  {:else}
    <ul class="posts">
      {#each blogs as post}
        <li>
          <a
            class="post"
            href={`/blogs/${post.slug}`}
            onclick={(e) => link(e, `/blogs/${post.slug}`)}
          >
            <div class="post-head">
              <h2>{post.title}</h2>
              {#if post.date}<time>{formatDate(post.date)}</time>{/if}
            </div>
            <p>{post.description}</p>
            {#if post.tags.length}
              <div class="tags">
                {#each post.tags as tag}<span class="tag">{tag}</span>{/each}
              </div>
            {/if}
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</PageShell>

<style>
  .posts {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .post {
    display: block;
    padding-left: 18px;
    margin: 10px 10px 10px 0;
    border-left: 3px solid #454545;
    border-radius: 10px;
    text-decoration: none;
    color: inherit;
    transition: border-left 0.2s ease
  }
  .post:hover {
    border-left: 3px solid var(--accent-hover);
  }

  .post-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }
  .post-head h2 {
    margin: 0;
  }
  time {
    font-family: var(--mono);
    font-size: 13px;
    color: var(--accent);
  }

  .post p {
    margin: 8px 0 14px;
    color: var(--text);
    opacity: 0.85;
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

  .empty {
    color: var(--text);
    opacity: 0.7;
  }
</style>
