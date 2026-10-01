---
title: "The Empty Commit"
date: 2026-09-03
description: "A tiny git trick that saved me an afternoon."
author: "John Stouffer"
tags: ["git", "tips"]
draft: false
---
CI stuck? Webhook missed? Don't touch a file just to trigger a build.

```bash
git commit --allow-empty -m "retrigger ci"
git push
```

## Why it's nice

- No fake whitespace changes in history
- Reviewers see exactly what it was
- Works with every CI I've tried

*That's the whole post.*
