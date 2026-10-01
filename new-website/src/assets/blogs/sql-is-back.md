---
title: "SQL Is Back"
date: 2026-08-13
description: "Why I moved a side project off the ORM and never looked back."
author: "John Stouffer"
tags: ["databases", "backend"]
draft: false
---
The ORM was fine until it wasn't.

## The query that broke me

```sql
SELECT u.name, COUNT(o.id) AS orders
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE o.created_at > NOW() - INTERVAL '30 days'
GROUP BY u.id
ORDER BY orders DESC
LIMIT 10;
```

Ten lines of SQL. Forty lines of ORM. Guess which one I could read six months later.

## When to keep the ORM

| Situation | ORM | Raw SQL |
| :--- | :---: | :---: |
| Simple CRUD | ✅ | ❌ |
| Reports | ❌ | ✅ |
| Migrations | ✅ | ✅ |
