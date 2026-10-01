---
title: "Python One-Liners"
date: 2026-05-14
description: "Five idioms I reach for every single day."
author: "John Stouffer"
tags: ["python", "tips"]
draft: false
---
Short, readable, and not clever for the sake of it.

```python
# 1. swap
a, b = b, a
# 2. flatten
flat = [x for row in grid for x in row]
# 3. count
from collections import Counter
top = Counter(words).most_common(3)
# 4. default dict get
val = d.get("key", "fallback")
# 5. zip loop
for name, score in zip(names, scores): ...
```

| Idiom | Replaces |
| :--- | :--- |
| `zip` | index loops |
| `Counter` | manual dicts |
