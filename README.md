# Eventually Consistent Form

Single-page React app demonstrating optimistic UI, retry logic, and duplicate prevention against a flaky mock API.

## Run

```bash
git clone https://github.com/dvr76/eventually-consistent-form.git

npm install

npm run dev
```

## State Machine

```
idle → pending → success
               → retrying (on 503) → success
                                    → retrying (up to 3 attempts)
                                    → failed
```

## Duplicate Prevention

A `useRef(Set)` tracks in-flight emails. Submits with a matching email are ignored until the request fully resolves or fails.

## Mock API

| Outcome         | Behavior                     |
| --------------- | ---------------------------- |
| Success         | Resolves after 500ms         |
| Temporary fail  | Rejects with 503 after 500ms |
| Delayed success | Resolves after 5–10s         |

Each outcome has ~33% chance.
