<script lang="ts">
  interface Props {
    title: string
    subtitle?: string
    children: import('svelte').Snippet
  }
  let { title, subtitle, children }: Props = $props()
</script>

<main class="page">
  <header class="page-head">
    <h1>{title}</h1>
    {#if subtitle}<p class="subtitle">{subtitle}</p>{/if}
  </header>
  {@render children()}
</main>

<style>
  .page {
    max-width: 1126px;
    margin: 0 auto;
    padding: 56px 32px 96px;
    min-height: calc(100svh - 65px);
    box-sizing: border-box;

    @media (max-width: 1024px) {
      padding: 40px 20px 72px;
    }
  }

  .page-head {
    margin-bottom: 40px;
  }

  .page-head h1 {
    margin: 0 0 8px;
  }

  .subtitle {
    font-size: 20px;
    color: var(--text);
    max-width: 640px;
    opacity: 0.85;
  }
</style>
