---
title: "Dark Mode Done Right"
date: 2026-08-06
description: "Two CSS variables and one media query is all you need."
author: "John Stouffer"
tags: ["css", "frontend"]
draft: false
---
Most dark modes are *inverted* modes. Here's the minimal version that isn't.

```css
:root {
  --bg: #fff;
  --fg: #111;
}
@media (prefers-color-scheme: dark) {
  :root { --bg: #000; --fg: #eee; }
}
```

## Rules I follow

1. Never pure white text on pure black.
2. Lower saturation on accents in dark mode.
3. Test with `color-mix()` instead of hardcoding greys.
