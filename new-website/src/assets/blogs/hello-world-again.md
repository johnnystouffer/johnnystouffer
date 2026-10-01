---
title: "Hello World, Again"
date: 2026-05-07
description: "Fourth rebuild of this site. Here's why it'll stick."
author: "John Stouffer"
tags: ["meta", "webdev"]
draft: false
---
Welcome to version four. Versions one through three are in the [graveyard](/blog/side-project-graveyard).

## What's different

- Plain Markdown files, no CMS
- One React component to parse them
- Nothing to log into, nothing to break

```javascript
const files = import.meta.glob('/public/assets/blogs/*.md', { query: '?raw', eager: true })
```

---

That's it. Now I just have to *write*.
