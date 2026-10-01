---
title: "Rust, First Impressions"
date: 2026-07-16
description: "The borrow checker and I are now on speaking terms."
author: "John Stouffer"
tags: ["rust", "learning"]
draft: false
---
I fought the compiler for a week. Then it clicked.

```rust
fn longest<'a>(a: &'a str, b: &'a str) -> &'a str {
    if a.len() > b.len() { a } else { b }
}
```

## What surprised me

- **Errors are documentation.** Read the whole message.
- `cargo` is the best build tool I've used.
- `Option` and `Result` make null feel barbaric.

> "Rust doesn't stop you from writing bugs. It stops you from *shipping* them."
