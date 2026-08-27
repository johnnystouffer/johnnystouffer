// Minimal History-API router with Svelte 5 reactive state.
export const route = $state({ path: window.location.pathname })

export function navigate(path: string) {
  if (path === route.path) return
  history.pushState({}, '', path)
  route.path = path
  window.scrollTo(0, 0)
}

window.addEventListener('popstate', () => {
  route.path = window.location.pathname
})

// Use on <a> elements to get client-side navigation while keeping real hrefs.
export function link(event: MouseEvent, href: string) {
  // let modified clicks (new tab, etc.) behave natively
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  event.preventDefault()
  navigate(href)
}
