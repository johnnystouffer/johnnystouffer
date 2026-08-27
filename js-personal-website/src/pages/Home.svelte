<script lang="ts">
  import { link } from '../lib/router.svelte'
</script>

<main id="home">

  <section class="hero">
    <p class="eyebrow">Hello! My name is</p>
    <h1 class="name">John Stouffer</h1>
    <p class="tagline">
      <i>Software Engineer I </i> <b> @ Collins Aerospace </b>
    </p>
    <p class="tagline">
      <i>Prev. Intern</i> <b>@ Tesla</b>
    </p>
    <p class="tagline">Working on embedded systems and random home projects.</p>

    <div class="cta">
      <a class="primary" href="/projects" onclick={(e) => link(e, '/projects')}
        >View Projects</a
      >
      <a class="secondary" href="/contact" onclick={(e) => link(e, '/contact')}
        >Get in Touch</a
      >
    </div>
  </section>
</main>

<style>
  #home {
    position: relative;
    max-width: 1126px;
    margin: 0 auto;
    padding: 0 32px;
    display: flex;
    flex-direction: column;
    min-height: calc(100svh - 65px);
    overflow: hidden;

    @media (max-width: 1024px) {
      padding: 0 20px;
    }
  }

  @keyframes drift-1 {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    50% {
      transform: translate(60px, 40px) scale(1.12);
    }
  }
  @keyframes drift-2 {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    50% {
      transform: translate(-50px, -30px) scale(1.15);
    }
  }
  @keyframes drift-3 {
    0%,
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      transform: translate(-35%, -60%) scale(1.2);
    }
  }

  /* ---- hero content ---- */
  .hero {
    position: relative;
    z-index: 1;
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
    animation: rise 0.6s ease both;
  }

  .name {
    margin: 0;
    background: linear-gradient(
      100deg,
      var(--text-h) 0%,
      var(--accent) 45%,
      var(--accent-hover) 70%,
      var(--text-h) 100%
    );
    background-size: 220% auto;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation:
      rise 0.6s ease 0.08s both,
      shimmer 6s linear infinite;
  }

  .tagline {
    font-size: 20px;
    max-width: 560px;
    color: var(--text);
    animation: rise 0.6s ease 0.16s both;
  }

  .cta {
    display: flex;
    gap: 12px;
    margin-top: 12px;
    flex-wrap: wrap;
    animation: rise 0.6s ease 0.24s both;
  }

  .cta a {
    display: inline-flex;
    padding: 8px 16px;
    border-radius: 15px;
    font-size: 16px;
    text-decoration: none;
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

  @keyframes shimmer {
    to {
      background-position: 220% center;
    }
  }
  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(14px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* respect reduced-motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .name,
    .eyebrow,
    .tagline,
    .cta {
      animation: none;
    }
  }
</style>
