---
title: "Latency Is a Feature"
date: 2026-07-02
description: "Users notice 100ms. Here's where it hides."
author: "John Stouffer"
tags: ["performance", "web"]
draft: false
---
We shaved 400ms off page load. Nobody touched the backend.

## Where it hid

| Source | Cost |
| :--- | ---: |
| Unused font weights | 120ms |
| Render-blocking analytics | 90ms |
| Uncompressed hero image | 150ms |
| Waterfall of `await` | 40ms |

```javascript
// before
const a = await getA();
const b = await getB();
// after
const [a, b] = await Promise.all([getA(), getB()]);
```
