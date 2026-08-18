<script lang="ts">
  import Navbar from './lib/Navbar.svelte'
</script>

<Navbar />

<main id="home">
  <section class="hero">
    <p class="eyebrow">Hi, my name is</p>
    <h1>John Stouffer</h1>
    <p class="tagline">
      Software engineer building thoughtful, reliable web experiences.
    </p>
    <div class="cta">
      <a class="primary" href="/projects">View Projects</a>
      <a class="secondary" href="/contact">Get in Touch</a>
    </div>
  </section>
</main>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap');
  #home {
    max-width: 1126px;
    margin: 0 auto;
    padding: 0 32px;
    display: flex;
    flex-direction: column;
    min-height: calc(100svh - 65px);

    @media (max-width: 1024px) {
      padding: 0 20px;
    }
  }

  .hero {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    text-align: left;
  }

  .eyebrow {
    color: var(--accent);
    font-family: var(--mono);
    font-size: 16px;
    margin: 0;
  }

  .hero h1 {
    margin: 0;
  }

  .tagline {
    font-size: 20px;
    max-width: 560px;
    color: var(--text);
  }

  .cta {
    display: flex;
    gap: 12px;
    margin-top: 12px;
    flex-wrap: wrap;
  }

  .cta a {
    display: inline-flex;
    padding: 8px 16px;
    border-radius: 15px;
    font-size: 16px;
    text-decoration: none;
    /* scale via transform so hovering/clicking never reflows nearby text */
    transform-origin: center;
    transition:
      box-shadow 0.2s,
      background 0.2s,
      border-color 0.2s,
      color 0.2s,
      transform 0.15s ease;

    &:hover {
      transform: scale(1.02);
    }
    &:active {
      transform: scale(0.98);
    }
  }

  .primary {
    color: #fff;
    background: var(--accent);

    &:hover {
      background: var(--accent-hover);
      box-shadow: var(--shadow);
    }
    &:active {
      background: var(--accent-active);
    }
  }

  .secondary {
    color: var(--text-h);
    background: transparent;
    border: 1px solid var(--border);

    &:hover {
      border-color: var(--accent-hover);
      color: var(--accent-hover);
    }
    &:active {
      border-color: var(--accent-active);
      color: var(--accent-active);
    }
  }
</style>
