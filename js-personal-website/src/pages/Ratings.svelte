<script lang="ts">
  import PageShell from '../lib/PageShell.svelte'

  const ratings = [
    { name: 'Something I Rated', category: 'Film', score: 9 },
    { name: 'Another Thing', category: 'Book', score: 8 },
    { name: 'A Restaurant', category: 'Food', score: 7 },
  ]
</script>

<PageShell title="Ratings" subtitle="Things I've experienced and how I'd rate them.">
  <ul class="list">
    {#each ratings as item}
      <li class="item">
        <div class="meta">
          <h2>{item.name}</h2>
          <span class="category">{item.category}</span>
        </div>
        <div class="stars" aria-label={`${item.score} out of 10`}>
          {#each Array(10) as _, i}
            <span class="pip" class:filled={i < item.score}></span>
          {/each}
          <span class="score">{item.score}/10</span>
        </div>
      </li>
    {/each}
  </ul>
</PageShell>

<style>
  .list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    padding-left: 18px;
    margin: 10px 10px 10px 0;
    border-left: 3px solid #454545;
    border-radius: 10px;
    transition: border-left 0.2s ease;
  }
  .item:hover {
    border-left: 3px solid var(--accent-hover);
  }

  .meta h2 {
    margin: 0;
  }
  .category {
    font-family: var(--mono);
    font-size: 13px;
    color: var(--accent);
  }

  .stars {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .pip {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--border);
  }
  .pip.filled {
    background: var(--accent);
  }
  .score {
    margin-left: 8px;
    font-family: var(--mono);
    font-size: 14px;
    color: var(--text);
  }
</style>
