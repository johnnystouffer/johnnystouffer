<script lang="ts">
  import { link } from '../lib/router.svelte'
</script>

<main class="page">
  <h1>404</h1>
  <p>This page doesn't exist.</p>
  <a href="/" onclick={(e) => link(e, '/')}>← Back home</a>
</main>

<style>
  .page {
    max-width: 1126px;
    margin: 0 auto;
    padding: 96px 32px;
    min-height: calc(100svh - 65px);
    box-sizing: border-box;
    text-align: center;
  }
  .page h1 {
    font-size: 96px;
    margin: 0;
  }
  .page p {
    color: var(--text);
    opacity: 0.8;
    margin: 8px 0 24px;
  }
  .page a {
    font-family: var(--mono);
    color: var(--accent);
    text-decoration: none;
  }
  .page a:hover {
    color: var(--accent-hover);
  }
</style>
