---
title: "Naming Things"
date: 2026-06-04
description: "The hardest problem, solved with three questions."
author: "John Stouffer"
tags: ["engineering", "opinion"]
draft: false
---
Bad name? Ask:

1. What does it **return**?
2. What does it **do** if it returns nothing?
3. Would a stranger guess right?

```javascript
// bad
function process(data) {}
// better
function normalizeUserEmails(users) {}
```

> If the name needs a comment, the name is the comment.
