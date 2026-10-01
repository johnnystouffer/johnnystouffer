---
title: "Ship It Friday"
date: 2026-09-18
description: "Why I stopped fearing Friday deploys and what changed."
author: "John Stouffer"
tags: ["engineering", "devops"]
draft: false
---
Every team has the rule: **no deploys on Friday**. I followed it for years. Then I asked *why*.

## The real problem

The rule isn't about Fridays. It's about confidence. If a deploy scares you on Friday, it should scare you on Tuesday too.

> "Fear of deploying is a symptom, not a policy."

## What we changed

1. Feature flags for every user-facing change.
2. Automated rollback in under 60 seconds.
3. A `#deploys` channel where every release posts itself.

```bash
git push origin main
# ci runs, canary goes out, flag stays off until Monday
```

- [x] Rollback tested weekly
- [x] Flags default off
- [ ] Convince the last skeptic
