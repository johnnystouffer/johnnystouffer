<script lang="ts">
  import { route, link } from './router.svelte'

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Experience', href: '/experience' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Ratings', href: '/ratings' },
    { label: 'Contact', href: '/contact' },
  ]

  let open = $state(false)

  function isActive(href: string): boolean {
    if (href === '/') return route.path === '/'
    return route.path === href || route.path.startsWith(href + '/')
  }

  function go(event: MouseEvent, href: string) {
    open = false
    link(event, href)
  }
</script>

<header class="navbar">
  <a class="brand" href="/" onclick={(e) => go(e, '/')}>John Stouffer</a>

  <button
    class="toggle"
    aria-label="Toggle navigation"
    aria-expanded={open}
    onclick={() => (open = !open)}
  >
    <span></span>
    <span></span>
    <span></span>
  </button>

  <nav class:open>
    <ul>
      {#each links as item}
        <li>
          <a
            href={item.href}
            class:active={isActive(item.href)}
            onclick={(e) => go(e, item.href)}>{item.label}</a
          >
        </li>
      {/each}
    </ul>
  </nav>
</header>

<style>
  .navbar {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 32px;
    background: color-mix(in srgb, var(--bg) 85%, transparent);
    backdrop-filter: blur(8px);

    @media (max-width: 1024px) {
      padding: 14px 20px;
    }
  }

  .brand {
    font-family: var(--heading);
    font-weight: 600;
    font-size: 20px;
    color: var(--text-h);
    text-decoration: none;
    letter-spacing: -0.4px;
  }

  nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 4px;
  }

  nav a {
    display: inline-flex;
    padding: 8px 14px;
    border-radius: 6px;
    font-size: 16px;
    color: var(--text);
    text-decoration: none;
    transition:
      color 0.2s,
      background 0.2s;

    &:hover {
      color: var(--accent);
    }
  }

  nav a.active {
    color: var(--accent);
    font-weight: 600;
  }

  .toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;

    span {
      display: block;
      width: 24px;
      height: 2px;
      background: var(--text-h);
      border-radius: 2px;
    }
  }

  @media (max-width: 720px) {
    .toggle {
      display: flex;
    }

    nav {
      position: absolute;
      top: 100%;
      right: 0;
      left: 0;
      background: var(--bg);
      overflow: hidden;
      max-height: 0;
      transition: max-height 0.25s ease;
    }

    nav.open {
      max-height: 400px;
      border-bottom: 1px dashed #696969;
    }

    nav ul {
      flex-direction: column;
      gap: 0;
      padding: 8px 20px 16px;
    }

    nav a {
      display: block;
      padding: 12px 8px;
    }
  }
</style>
