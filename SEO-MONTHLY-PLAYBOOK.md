# LisensyaPrep — Monthly SEO Harvest Playbook

A repeatable monthly cycle for growing organic traffic and AdSense revenue.
Last run: **2026-07-18** (Tier 1–3 pass on 13 pages + published `is-nursing-worth-it-philippines`).

---

## Core philosophy

Two levers, run **both** every month — they are one engine, not a choice:

1. **Publish** (top of funnel) — new keywords, new impressions, and topical authority
   that lifts your *existing* pages. Aimed, never blind. A site that stops publishing
   stops growing.
2. **Harvest** (the cheap wins) — take pages already ranking at position ~4–10 and push
   them to top-3 via better titles, real freshness, FAQ schema, and internal links.
   A page at pos 3 earns ~3× a page at pos 7 for the *same* content.

The failure mode to avoid is **publish-and-forget**: ~55% of pages historically landed in
a dead tail (<5 clicks/3mo) because they were published without a target and never revisited.

---

## The monthly loop

```
1. Export data (see below) → drop into Articles/
2. MEASURE: did last month's touched pages move up in position / CTR / clicks?
3. IDENTIFY: next striking-distance batch (pos 4–10, high impressions, winnable CTR)
4. HARVEST: titles, freshness (real changes only), FAQ schema, internal links
5. PUBLISH: 2–4 NEW winner-pattern pages (aimed at real search demand)
6. BUILD → DEPLOY → Request Indexing in GSC
```

Do **not** re-touch a page you already optimized just because 30 days passed. Only revisit
a previously-optimized page if the data shows it did *not* move and you have a new idea.

---

## Step 1 — Data to export each month

Drop these into the `Articles/` folder (same as the 2026-07-18 run):

- **Google Search Console** → Performance → Search results → **Last 3 months** → Export.
  Gives `Pages.csv`, `Queries.csv`, `Countries.csv`, `Devices.csv`, `Chart.csv`, etc.
- **AdSense** → Reports → daily estimated earnings → export as `report.csv`.
  The single most important number is **page RPM** (revenue per 1,000 pageviews).

Then tell Claude Code: *"run the monthly SEO cycle, exports are in Articles/"*.

---

## Step 2 — Measure last month's batch

For each page you touched last month, compare **Position**, **CTR**, and **Clicks** vs the
prior export. Wins tell you which tactics to double down on:

- Position moved up → freshness / internal links worked.
- CTR moved up at same position → the title/meta rewrite worked.
- Nothing moved after 4+ weeks → the page may need real content depth, not just a title.

Note: changes take **2–4 weeks** (often longer) to show. Don't judge a change younger than that.

---

## Step 3 — Identify the next striking-distance batch

"Striking distance" = ranking **page 1 but below top-3** (position ~4–10) with **high
impressions** and a **winnable CTR**. Reproducible opportunity score (run from the export folder):

```bash
awk -F',' 'NR>1{
  url=$1; clicks=$2; impr=$3; ctr=$4; pos=$5;
  gsub("%","",ctr); ctr=ctr/100;
  m_impr=impr/3; m_clicks=clicks/3;      # export is 3 months
  if(pos>=3.5 && pos<=10.5){
    target=0.08;                          # realistic top-3 CTR for informational SERPs
    gain=m_impr*(target-ctr);
    if(gain>0) printf "%8.0f | pos %4.1f | impr/mo %7.0f | ctr %5.2f%% | clk/mo %5.0f | %s\n",
      gain, pos, m_impr, ctr*100, m_clicks, url;
  }
}' Pages.csv | sort -rn | head -25
```

**Filter the raw scores with judgment — the top score is often a trap:**

- **Navigational queries never convert to clicks**, even at #1. Example: the `leris` /
  `leris login` cluster had ~280k impressions but 0.04–0.29% CTR — users want the official
  PRC login page, not a third-party explainer. Ignore these no matter how big the number.
- Cross-check `Queries.csv` (`sort -rn` by impressions) to see the *actual* search terms
  behind a page before optimizing it.
- Prefer pages with **healthy CTR at pos 5–7** (clean rank-push win) and pages with **high
  impressions + abnormally low CTR** where the low CTR is a *title* problem, not intent.

---

## Step 4 — Harvest tactics (apply per page)

1. **Title rewrite (CTR).** Front-load the exact head keyword + year; add the specific thing
   searchers want (requirements / fees / deadlines / a number). Keep under ~65 chars to avoid
   SERP truncation. Don't touch titles that already have healthy CTR (>4–5%) except to trim length.
2. **Freshness — REAL changes only.** Bump `dateModified` (schema) + the visible date **only
   when you actually change something** (new section, updated data, new exam cycle). Never
   date-bump on a timer with no content change — Google discounts fake freshness.
   - Static pages: edit `datePublished`/`dateModified` in the SCHEMA object + the visible
     `<span>` date. Visible date can read `Updated <Month DD, YYYY>` (free text).
   - Blog entries in `lib/blogData.js`: the `date` field is parsed by `new Date()` for sorting,
     so it **must stay a real date string** (`'July 18, 2026'`, NOT `'Updated July 18, 2026'`).
3. **FAQ schema (rich-result CTR).** Blog entries render an optional `faqSchema` string; add a
   `FAQPage` JSON-LD (3–4 Q&A). Static pages: add a `<Script type="application/ld+json">`.
   Answers must be factually accurate — verify volatile numbers, never fabricate.
4. **Internal links.** Point keyword-anchor links **from** high-authority pages (homepage,
   `*-coverage-2026` pages) **into** the page you're lifting. Concentrate equity on the ~10–15
   target pages; do not spam a link in every row. Verify every link target exists first.

---

## Step 5 — Publish new pages (aimed, not blind)

Proven winner patterns on this site: `*-coverage-2026`, subject `reviewers`,
`application-guide`, `how-to-pass-*`, `is-<profession>-worth-it`. Clone these into
professions/subjects not yet covered. **Check search demand before writing** — a perfect
article on a zero-demand keyword still gets ~5 clicks.

Wiring for a new page to be visible (project-specific):
- New article page under `app/<category>/<slug>/page.jsx` (copy an existing sibling's structure).
- Register in `lib/blogData.js` for `/blog` visibility; category filters live in
  `app/blog/BlogClient.jsx`.
- New courses/quizzes also need `components/Header.jsx` COURSES + `collection/page.jsx`.
- After publishing a draft from `Articles/`, delete the draft (Articles/ is a publish queue).

---

## Step 6 — Deploy + index

1. `npx next build` — confirm "Compiled successfully" and the routes generate.
2. Commit; **deploy = `git push origin main`** (Vercel auto-deploys from GitHub).
3. Verify live: load a changed URL, confirm the update shows (e.g. the new date).
4. **GSC → URL Inspection → Request Indexing** for every changed/new URL. This does not
   boost rankings — it just makes Google re-crawl the fresh version sooner. GSC throttles
   after ~10/day; prioritize highest-earning pages first.

---

## The revenue reality (why this is a 12–24 month game)

- Revenue = **pageviews × RPM**. To hit **$1,000/mo** you need roughly 250k–670k pageviews/mo
  depending on RPM.
- Audience is ~99% Philippines, so **RPM is low (~$1.5–2.5)** — the floor of the range.
  The biggest RPM lever is capturing more **abroad traffic** (US/UK/Canada/Gulf readers
  monetize 5–20× a PH reader): NCLEX, UK/Canada/Gulf nursing pathway pages, etc.
- Getting to $1k needs **both** levers sustained: keep publishing winner-pattern pages **and**
  harvest each one. Optimization alone has a ceiling; publishing alone bleeds effort on the tail.

---

## August cycle note

August = **PNLE exam season** → real freshness triggers (exam happens, results/schedules/
passing rates update). Prioritize exam-cycle pages then (PNLE coverage, schedule, results,
application) because they'll have genuine news to add — legitimate freshness, not a date bump.
