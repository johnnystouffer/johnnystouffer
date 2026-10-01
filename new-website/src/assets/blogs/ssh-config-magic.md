---
title: "SSH Config Magic"
date: 2026-06-11
description: "Stop typing hostnames. Your shell already knows them."
author: "John Stouffer"
tags: ["tooling", "devops"]
draft: false
---
If you type `ssh user@10.0.0.42 -p 2222` more than once, read this.

```bash
# ~/.ssh/config
Host prod
  HostName 10.0.0.42
  User deploy
  Port 2222
  IdentityFile ~/.ssh/prod_ed25519
```

Now it's just `ssh prod`. Tab completion works too.

## Bonus

- `ControlMaster auto` reuses connections
- `ServerAliveInterval 60` stops the drops
