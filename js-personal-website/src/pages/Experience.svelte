<script lang="ts">
  import PageShell from '../lib/PageShell.svelte'

  const roles = [
    {
      title: 'Software Engineer',
      company: 'Company Name',
      period: '2024 — Present',
      points: [
        'Describe a key responsibility or achievement here.',
        'Another highlight of the impact you made.',
      ],
    },
    {
      title: 'Software Engineering Intern',
      company: 'Previous Company',
      period: 'Summer 2023',
      points: ['What you built and the technologies you used.'],
    },
  ]
</script>

<PageShell title="Experience" subtitle="Where I've worked and what I've built.">
  <ol class="timeline">
    {#each roles as role}
      <li class="entry">
        <div class="body">
          <div class="row">
            <h2>{role.title}</h2>
            <span class="period">{role.period}</span>
          </div>
          <p class="company">{role.company}</p>
          <ul>
            {#each role.points as point}
              <li>{point}</li>
            {/each}
          </ul>
        </div>
      </li>
    {/each}
  </ol>
</PageShell>

<style>
  .timeline {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .entry {
    position: relative;
    padding: 0 0 32px;
  }

  .row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  .row h2 {
    margin: 0;
  }

  .period {
    font-family: var(--mono);
    font-size: 14px;
    color: var(--accent);
  }

  .company {
    margin: 2px 0 10px;
    color: var(--text);
    opacity: 0.85;
  }

  .body ul {
    margin: 0;
    padding-left: 18px;
  }
  .body li {
    margin-bottom: 4px;
  }
</style>
