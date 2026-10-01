---
title: "Testing in Production"
date: 2026-05-28
description: "Everyone does it. Some of us admit it."
author: "John Stouffer"
tags: ["devops", "engineering"]
draft: false
---
Staging lies. Production doesn't.

## Do it safely

- Feature flags scoped to *your* account
- Canary to 1% of traffic
- Dashboards open **before** you flip the switch

```yaml
rollout:
  canary: 1%
  watch: error_rate < 0.5%
  then: 25%, 50%, 100%
```

- [x] Alerts wired
- [x] Rollback rehearsed
- [ ] Sleep
