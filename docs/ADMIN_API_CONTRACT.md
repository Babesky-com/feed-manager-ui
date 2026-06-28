# Admin API Contract

Source: `feedgen/src/routes/admin.ts` (v1.0.0)

All admin routes are mounted under `/admin/*` on the feedgen Express server.

## Authentication

Two auth modes, checked in order:

1. **OAuth session cookie** — `admin_session` httpOnly cookie set by the server-side OAuth flow. The `requireAdmin()` middleware reads it via `readAdminSessionCookie()`, looks up the session DID in the `oauth_session` table, and checks membership in `ADMIN_DIDS`.

2. **Bearer token** — `Authorization: Bearer <jwt>` header. Supports:
   - PDS session JWTs (classic Bluesky app password login)
   - ATProto OAuth access tokens (verified via JWKS)
   - URL-issuer PDS session tokens (verified via `com.atproto.server.getSession`)

**Errors:**
- `401 { error: 'AuthRequired', message: '...' }` — no valid token/cookie
- `403 { error: 'Forbidden', message: 'Not an admin' }` — authenticated but not in ADMIN_DIDS/ADMIN_HANDLES

---

## Auth & Discovery (no auth required)

### GET /admin/ping
Health check — confirms admin routes are reachable.

**Response:** `{ ok: true }`

---

### GET /admin/auth-modes
Discover available login methods.

**Response:**
```json
{
  "blueskyEnabled": true,
  "oauthEnabled": true
}
```

---

### GET /admin/oauth-client-metadata.json
ATProto OAuth client metadata document. The `client_id` in OAuth flows is the URL pointing to this endpoint. Only served over HTTPS in production.

**Response:** OAuth client metadata JSON (per ATProto OAuth spec).

---

### GET /admin/oauth-auth-server?pds=<url>
Server-side proxy to fetch OAuth authorization server metadata from a PDS URL (avoids browser CORS). Validates URL, blocks SSRF to private addresses.

**Query params:**
- `pds` (required) — PDS URL, e.g. `https://bsky.social`

**Response:** OAuth authorization server metadata JSON.

**Errors:** `400` (invalid pds), `502` (PDS doesn't support OAuth, or metadata fetch failed)

---

### GET /admin/oauth/login?handle=<handle_or_did>
Start server-side ATProto OAuth flow. Redirects browser to the user's authorization server.

**Query params:**
- `handle` (required) — Bluesky handle or DID, with or without `@`

**Response:** `302` redirect to authorization server.

---

### GET /admin/oauth/callback
OAuth callback endpoint. Exchanges code, enforces admin allow-list, sets session cookie, redirects to `/admin/`.

---

### POST /admin/oauth/logout
Destroy admin session and clear cookie.

**Response:** `{ ok: true }`

---

## Statistics

### GET /admin/stats
Full dashboard stats in a single response.

**Query params:**
- `days` (optional, default 7) — historical chart period (1–365, clamped to `metricsRetentionDays`)
- `topLimit` (optional, default 30, max 100) — limit for "top posts by times shown" / "top creators"
- `topPostsPerDayLimit` (optional, default 5, max 15) — posts per day in `topPostsByDay`
- `includePreviews` (optional, `1` or `true`) — fetch post text, author handle, avatar, embeds for referenced posts

**Response (condensed shape):**
```json
{
  "overall": {
    "totalFeedRequests": 12345,
    "totalImpressions": 54321,
    "totalUniqueViewers": 142,
    "newUsers": 12,
    "recurringUsers": 130,
    "totalEngagementsInFeed": 890,
    "dau": [{ "date_utc": "24h rolling", "dau": 42 }],
    "approvedSetSize": 320,
    "postCounts": { "last24h": 450, "last72h": 1200 }
  },
  "historicalDaily": [
    { "date_utc": "2026-06-13", "dau": 42, "feed_requests": 1200, "impressions": 8000 }
  ],
  "interactions": { "interactionLike": 120, "interactionRepost": 45, "requestLess": 12 },
  "feedInteractions": { "2026-06-13": { "interactionLike": 20, "interactionRepost": 5 } },
  "posts": {
    "byTimesShown": [{ "post_uri": "at://...", "times_shown": 50, "unique_viewers": 30, "engagements": { "like": 5, "repost": 2, "total": 7 } }],
    "byEngagement": [...]
  },
  "creators": [
    { "authorDid": "did:plc:...", "total_impressions": 500, "posts_shown_count": 10, "unique_viewers": 42, "total_engagements_in_feed": 15, "handle": "user.bsky.social" }
  ],
  "topPostsByDay": { "2026-06-13": [{ "post_uri": "at://...", "engagements": { ... } }] },
  "maxEngagementByDay": [{ "date_utc": "2026-06-13", "post_uri": "at://...", "engagement_total": 15 }],
  "postPreviews": { "at://...": { "uri": "...", "text": "...", "handle": "...", "bskyUrl": "https://bsky.app/...", "avatar": "..." } }
}
```

---

### GET /admin/stats/hourly?date=YYYY-MM-DD
Hourly breakdown for a single day.

**Query params:**
- `date` (required) — `YYYY-MM-DD` format

**Response:**
```json
{
  "date": "2026-06-19",
  "hourly": [
    { "hour": "00", "label": "00:00", "feed_requests": 12, "impressions": 45, "interactions": 3 }
  ]
}
```

**Errors:** `400` — invalid date format

---

### GET /admin/metrics/series?days=7
Time-series for charts (DAU, impressions, engagements by day).

**Query params:**
- `days` (optional, default 7, max 365)

**Response:**
```json
{
  "dau": [{ "date_utc": "2026-06-13", "dau": 42 }],
  "impressions": [{ "date_utc": "2026-06-13", "count": 1200 }],
  "engagements": [{ "date_utc": "2026-06-13", "count": 45 }]
}
```

---

## Per-Feed Metrics

### GET /admin/feeds?days=7
List registered feeds from `feed_config`, including display metadata and summary metrics.

**Query params:**
- `days` (optional, default 7, max 365) — aggregation window for summary metrics

**Response:**
```json
{
  "days": 7,
  "feeds": [
    {
      "feed_type": "babesky-algo",
      "display_name": "Babesky Algo",
      "description": "Personalized feed for the babesky community",
      "feed_uri": "at://did:web:feeds.example.com/app.bsky.feed.generator/babesky-algo",
      "total_views": 1234,
      "total_users": 321,
      "days_active": 7
    }
  ]
}
```

**Errors:** `404` is not used for an empty registry; returns `feeds: []`.

---

### GET /admin/feeds/:feedType?days=30
Single feed detail with config metadata, aggregate totals, and recent daily metrics.

**Query params:**
- `days` (optional, default 30, max 365) — aggregation window; `daily_metrics` is capped to 30 days

**Response:**
```json
{
  "feed_type": "babesky-algo",
  "display_name": "Babesky Algo",
  "description": "Personalized feed for the babesky community",
  "params": "{\"topic\":\"babesky\"}",
  "feed_uri": "at://did:web:feeds.example.com/app.bsky.feed.generator/babesky-algo",
  "created_at": "2026-06-01T12:00:00.000Z",
  "updated_at": "2026-06-13T12:00:00.000Z",
  "days": 30,
  "total_views": 1234,
  "total_users": 321,
  "days_active": 12,
  "daily_metrics": [
    { "date_utc": "2026-06-13", "unique_users": 42, "daily_views": 200, "daily_posts": 800 }
  ]
}
```

**Errors:** `404 { error: 'NotFound', message: "Feed '<feedType>' not found in feed_config" }`

---

### PATCH /admin/feeds/:feedType
Update editable feed metadata in `feed_config`. `feed_type` is immutable; create a new feed instead of renaming.

**Body:**
```json
{
  "display_name": "Babesky Algo",
  "description": "Updated description",
  "params": { "topic": "babesky" }
}
```

**Response:**
```json
{
  "feed_type": "babesky-algo",
  "display_name": "Babesky Algo",
  "description": "Updated description",
  "params": "{\"topic\":\"babesky\"}",
  "feed_uri": "at://did:web:feeds.example.com/app.bsky.feed.generator/babesky-algo",
  "created_at": "2026-06-01T12:00:00.000Z",
  "updated_at": "2026-06-13T12:00:00.000Z"
}
```

**Errors:** `400 ValidationError`, `404 { error: 'NotFound', message: "Feed '<feedType>' not found in feed_config" }`

---

### GET /admin/feeds/:feedType/daily-metrics?days=30
Time-series daily metrics for charts.

**Query params:**
- `days` (optional, default 30, max 365)

**Response:**
```json
{
  "feed_type": "babesky-algo",
  "feed_uri": "at://did:web:feeds.example.com/app.bsky.feed.generator/babesky-algo",
  "days": 30,
  "metrics": [
    { "date_utc": "2026-06-13", "unique_users": 42, "daily_views": 200, "daily_posts": 800 }
  ]
}
```

**Errors:** `404 { error: 'NotFound', message: "Feed '<feedType>' not found" }`

---

### GET /admin/feeds/:feedType/interactions?days=7
Interaction breakdown for a specific feed. Matches `feed_interactions.feedContext` to the feed type.

**Query params:**
- `days` (optional, default 7, max 90)

**Response:**
```json
{
  "feed_type": "babesky-algo",
  "days": 7,
  "by_event": { "interactionLike": 120, "interactionRepost": 45 },
  "by_day": { "2026-06-13": { "interactionLike": 20, "interactionRepost": 5 } },
  "recent": [
    { "event": "interactionLike", "user_did": "did:plc:...", "item_uri": "at://...", "created_at": "2026-06-13T12:00:00.000Z" }
  ]
}
```

**Errors:** `404 { error: 'NotFound', message: "Feed '<feedType>' not found" }`

---

### GET /admin/feed-daily-metrics-summary?days=7
Legacy aggregate summary from `feed_daily_metrics`, grouped by feed URI. Prefer `/admin/feeds` when the UI needs feed config metadata.

**Query params:**
- `days` (optional, default 7, max 365)

**Response:**
```json
{
  "days": 7,
  "feeds": [{ "feed_uri": "at://...", "total_views": 1234, "total_users": 321, "days_active": 7 }]
}
```

---

### GET /public/feed-stats?feed_uri=<uri>&days=7
Public (no auth) per-feed daily metrics. CORS-enabled for `*.babesky.com`.

**Query params:**
- `feed_uri` (required) — full AT URI of the feed
- `days` (optional, default 7, max 90)

**Response:**
```json
{ "feed_uri": "at://...", "days": 7, "metrics": [{ "date_utc": "...", "dau": 42, "requests": 200 }] }
```

---

## Feed Preview & Debugging

### GET /admin/feed-preview?limit=25&cursor=...&jitter=0&viewer=<handle_or_did>
Run the feed algorithm for a viewer with per-post scoring reasons. No events are recorded (dry run).

**Query params:**
- `viewer` (optional) — handle or DID; defaults to the authenticated admin's DID
- `limit` (optional, default 25, max 100)
- `cursor` (optional) — pagination cursor
- `jitter` (optional, `0` to disable score jitter)

**Response:**
```json
{
  "cursor": "...",
  "feed": [
    {
      "uri": "at://...",
      "score": 0.842,
      "reasons": [{ "signal": "recency", "value": 0.9 }, { "signal": "engagement", "value": 0.7 }],
      "bskyUrl": "https://bsky.app/profile/..."
    }
  ]
}
```

---

### GET /admin/personalization-verify?viewer=<handle_or_did>
Full personalization data summary for a viewer. Shows what the scoring engine knows about a user across all pipelines.

**Query params:**
- `viewer` (optional) — handle or DID; defaults to admin

**Response (condensed):**
```json
{
  "viewerDid": "did:plc:...",
  "requestedViewer": "user.bsky.social",
  "pipelines": {
    "seeLess": { "postUris": 3, "authors": 1, "patterns": { "total": 4, "labels": {}, "postTypes": {}, "sentiments": {}, "hashtags": [] } },
    "seeMore": { "authors": 2, "patterns": { ... } },
    "served": { "count": 1500 },
    "seen": 200,
    "interacted": 45,
    "inNetwork": 320,
    "degree1": 150,
    "degree2": 80,
    "labelPreference": {},
    "postTypePreference": {},
    "sentimentPreference": {},
    "labelByTimeOfDay": {},
    "postTypeByTimeOfDay": {},
    "labelByDayOfWeek": {},
    "coLikerBoostUris": 12,
    "popularInCommunity": 50
  },
  "summary": {
    "hasSeeLess": true,
    "hasSeeMore": true,
    "hasPreferenceSignal": true,
    "hasInterest": true,
    "coldStart": false
  }
}
```

---

### GET /admin/post-metrics?uri=<at_uri>&days=7
Per-post metrics: unique viewers, DAU by day, in-feed engagement breakdown.

**Query params:**
- `uri` (required) — AT URI (`at://...`)
- `days` (optional, default 7, max 365)

**Response:**
```json
{
  "post_uri": "at://...",
  "days": 7,
  "unique_viewers": 42,
  "dau_by_date": [{ "date_utc": "2026-06-13", "unique_viewers": 10 }],
  "engagement": {
    "interactionSeen": 50, "interactionLike": 12, "interactionRepost": 3,
    "interactionReply": 2, "interactionQuote": 1,
    "requestLess": 0, "requestMore": 0
  }
}
```

---

## Diagnostics

### GET /admin/interactions-debug?days=7
Raw counts for diagnosing zero interaction stats (multi-replica, missing itemUri).

**Response:**
```json
{
  "days": 7,
  "sinceIso": "2026-06-12T...",
  "feed_interactions_count": 500,
  "interaction_metrics_events_count": 500,
  "recent_sample": [{ "userDid": "...", "itemUri": "...", "event": "interactionLike", "createdAt": "..." }],
  "hint": "If feed_interactions_count is 0 but you see sendInteractions in logs..."
}
```

---

### GET /admin/interaction-ingest-status?hours=24
Verify requestLess/requestMore ingestion pipelines.

**Response:**
```json
{
  "windowHours": 24,
  "sinceIso": "...",
  "sqliteLocation": "/data/db.sqlite",
  "likelyPersistentVolume": true,
  "counts": {
    "feedInteractionsByEvent": { "requestLess": 3, "requestMore": 5 },
    "requestLessAuthors": 1, "requestMoreAuthors": 2,
    "requestLessSignals": 3, "requestMoreSignals": 5
  },
  "recent": { "feedInteractions": [...], "requestLessSignals": [...], "requestMoreSignals": [...] }
}
```

---

## Sticky Posts CRUD

### GET /admin/sticky-posts
List all sticky/pinned/rotating/fallback posts.

**Response:**
```json
{
  "rows": [{ "uri": "at://...", "type": "pinned", "sort_order": 0, "created_at": "..." }],
  "byType": {
    "pinned": [...],
    "rotating": [...],
    "first_time_only": [...],
    "empty_fallback": [...]
  }
}
```

### POST /admin/sticky-posts
Add or update a sticky post.

**Body:** `{ "uri": "at://...", "type": "pinned|rotating|first_time_only|empty_fallback" }`

**Response:** `{ ok: true, uri: "...", type: "pinned" }`

**Errors:** `400` — invalid uri or type

### DELETE /admin/sticky-posts?uri=<at_uri>
Remove a sticky post.

**Query params:** `uri` (required)

**Response:** `{ ok: true, deleted: 1 }`

---

## Post Preview

### GET /admin/post-preview?uris=<comma-separated>
Fetch post metadata (text, author) for display.

**Query params:**
- `uris` (required) — comma-separated AT URIs, max 75

**Response:**
```json
{
  "previews": [{ "uri": "at://...", "text": "Hello world", "authorDid": "did:plc:...", "handle": "user.bsky.social", "bskyUrl": "https://bsky.app/..." }]
}
```

---

## Summary: UI Pages Mapping

| UI Page | Admin API Endpoints |
|---------|-------------------|
| Dashboard overview | `/admin/stats` |
| Hourly breakdown | `/admin/stats/hourly` |
| Per-feed metrics | `/admin/feeds`, `/admin/feeds/:feedType`, `/admin/feeds/:feedType/daily-metrics`, `/admin/feeds/:feedType/interactions`, `/admin/feed-daily-metrics-summary`, `/public/feed-stats` |
| Feed preview | `/admin/feed-preview`, `/admin/post-preview` |
| Personalization debugger | `/admin/personalization-verify` |
| Post detail | `/admin/post-metrics`, `/admin/post-preview` |
| Sticky posts manager | `/admin/sticky-posts` (GET/POST/DELETE) |
| Time-series charts | `/admin/metrics/series` |
| Diagnostics | `/admin/interactions-debug`, `/admin/interaction-ingest-status` |
| Login | `/admin/oauth/login`, `/admin/oauth/callback`, `/admin/oauth/logout`, `/admin/auth-modes`, `/admin/oauth-client-metadata.json`, `/admin/oauth-auth-server` |
