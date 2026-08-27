<script lang="ts">
  import PageShell from '../lib/PageShell.svelte'
  import mailIcon from '../assets/icons/mail.svg?raw'
  import githubIcon from '../assets/icons/github.svg?raw'
  import linkedinIcon from '../assets/icons/linkedin.svg?raw'

  const socials = [
    {
      label: 'Email',
      value: 'johnstouffer18@gmail.com',
      href: 'mailto:johnstouffer18@gmail.com',
      icon: mailIcon,
    },
    {
      label: 'GitHub',
      value: 'github.com/johnnystouffer',
      href: 'https://github.com/johnnystouffer',
      icon: githubIcon,
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/johnstouffer',
      href: '#',
      icon: linkedinIcon,
    },
  ]
</script>

<PageShell title="Contact" subtitle="Let's get in touch — I'd love to hear from you.">
  <ul class="links">
    {#each socials as social}
      <li>
        <a
          href={social.href}
          target={social.href.startsWith('http') ? '_blank' : undefined}
          rel="noreferrer"
        >
          <span class="icon" aria-hidden="true">{@html social.icon}</span>
          <span class="text">
            <span class="label">{social.label}</span>
            <span class="value">{social.value}</span>
          </span>
        </a>
      </li>
    {/each}
  </ul>
</PageShell>

<style>
  .links {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-width: 560px;
  }

  .links a {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 8px;
    text-decoration: none;
    color: inherit;
    transition: color 0.2s;
  }
  .links a:hover .value,
  .links a:hover .icon {
    color: var(--accent-hover);
  }

  .icon {
    display: inline-flex;
    flex-shrink: 0;
    color: var(--accent);
    transition: color 0.2s;
  }
  .icon :global(svg) {
    width: 22px;
    height: 22px;
    display: block;
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .label {
    font-family: var(--mono);
    font-size: 13px;
    color: var(--accent);
  }
  .value {
    color: var(--text);
    /* keep long emails/urls from overflowing narrow screens */
    word-break: break-word;
    overflow-wrap: anywhere;
    transition: color 0.2s;
  }
</style>
