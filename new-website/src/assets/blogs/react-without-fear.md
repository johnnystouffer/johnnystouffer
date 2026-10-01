---
title: "React Without Fear"
date: 2026-08-27
description: "Three mental models that made hooks finally click."
author: "John Stouffer"
tags: ["react", "frontend"]
draft: false
---
Hooks confused me for a year. These three ideas fixed that.

## 1. Render is a function of state

Nothing more. Every render is a fresh call.

## 2. Effects sync with the outside world

If it doesn't touch the DOM, a network, or a timer, it probably isn't an effect.

```javascript
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}, []);
```

## 3. The dependency array is not an optimization

It's a **correctness** contract. Lie to it and it will lie back.
