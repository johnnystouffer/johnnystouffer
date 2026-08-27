<script lang="ts">
  import Navbar from './lib/Navbar.svelte'
  import { route } from './lib/router.svelte'
  import Home from './pages/Home.svelte'
  import Experience from './pages/Experience.svelte'
  import Projects from './pages/Projects.svelte'
  import Blogs from './pages/Blogs.svelte'
  import BlogPost from './pages/BlogPost.svelte'
  import Ratings from './pages/Ratings.svelte'
  import Contact from './pages/Contact.svelte'
  import NotFound from './pages/NotFound.svelte'

  const blogMatch = $derived(route.path.match(/^\/blogs\/([^/]+)$/))
</script>

<Navbar />

{#if route.path === '/'}
  <Home />
{:else if route.path === '/experience'}
  <Experience />
{:else if route.path === '/projects'}
  <Projects />
{:else if blogMatch}
  <BlogPost slug={blogMatch[1]} />
{:else if route.path === '/blogs'}
  <Blogs />
{:else if route.path === '/ratings'}
  <Ratings />
{:else if route.path === '/contact'}
  <Contact />
{:else}
  <NotFound />
{/if}

<style>
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap');
</style>
