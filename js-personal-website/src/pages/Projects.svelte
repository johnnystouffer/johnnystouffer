<script lang="ts">
  import PageShell from '../lib/PageShell.svelte'

  const projects = [
    {
      name: 'Project One',
      description: 'A short description of the project and the problem it solves.',
      tags: ['Svelte', 'TypeScript', 'Vite'],
      link: '#',
    },
    {
      name: 'Project Two',
      description: 'Another project. Swap these placeholders for the real thing.',
      tags: ['Python', 'FastAPI'],
      link: '#',
    },
    {
      name: 'Project Three',
      description: 'Highlight something you are proud of building.',
      tags: ['React', 'Node'],
      link: '#',
    },
  ]
</script>

<PageShell title="Projects" subtitle="A selection of things I've built.">
  <div class="grid">
    {#each projects as project}
      <a class="card" href={project.link}>
        <div class="card-head">
          <h2>{project.name}</h2>
        </div>
        <p>{project.description}</p>
        <div class="tags">
          {#each project.tags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>
      </a>
    {/each}
  </div>
</PageShell>

<style>
  .grid {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .card {
    display: block;
    padding-left: 18px;
    margin: 10px 10px 10px 0;
    border-left: 3px solid #454545;
    border-radius: 10px;
    text-decoration: none;
    color: inherit;
    transition: border-left 0.2s ease;
  }
  .card:hover {
    border-left: 3px solid var(--accent-hover);
  }

  .card-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }
  .card-head h2 {
    margin: 0;
  }
  .card p {
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
</style>
