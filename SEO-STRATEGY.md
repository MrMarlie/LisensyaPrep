# LisensyaPrep — Strategic SEO Plan

_Existing-site scale & consolidation strategy · Generated 2026-07-05_

## 1. Where you are (baseline)

**Business type:** Education publisher + digital products (exam prep). Hybrid of a
content publisher (SEO-fed) and a lead-gen product funnel (freebie starter pack →
paid mastery system).

**Domain:** lisensyaprep.com · **Content footprint:** ~96 vertical pages + 129
registered blog posts.

**Architecture (already strong):** Hub-and-spoke per exam vertical —
`/{vertical}` hub → `/{vertical}/{reviewer|guide|coverage|results}` spokes +
`/{vertical}/[module]` quizzes. This is textbook topical-authority structure.

**Vertical maturity (spoke depth):**

| Vertical | Exam | Spokes | State |
|---|---|---|---|
| nursing | NCLEX / PNLE | 24 | Deep — flagship |
| education | LET | 15 | Deep |
| civil-service | CSE | 14 | Deep |
| criminology | CLE | 10 | Solid |
| pharmacy | PLE | 9 | Solid |
| medical-technology | MTLE | 8 | Growing (+ split `/medtech` legacy) |
| agriculture | ALE | 0 | **Fragmented — reviewers live under `/blog/*-ale`** |

**Differentiator / moat:** bilingual EN + Tagalog content ("libreng reviewer",
"paano pumasa", "mga dapat dalhin"). Few competitors target Tagalog-language
board-exam queries. This is your defensible edge.

---

## 2. Strategic thesis

You've already won the hard part — a coherent hub-and-spoke architecture across
7 verticals. The 12-month game is **not** "build more"; it's:

1. **Consolidate** the two architectural leaks bleeding topical authority
   (Agriculture fragmentation, `/medtech` split).
2. **Systematize the seasonal results/schedule engine** — the highest-ROI,
   most-repeatable organic traffic on a PRC-exam site.
3. **Close the funnel loop** so every ranking reviewer page feeds a freebie
   capture, then a mastery upsell.
4. **Lean into Tagalog** as a moat competitors won't copy.

---

## 3. Critical fixes (do first — architecture leaks)

### 3.1 Agriculture: rebuild the hub  — CRITICAL
- **Observation (THINK):** every other vertical concentrates authority at
  `/{vertical}/{spoke}`. Agriculture's reviewers sit at `/blog/agri-economics-reviewer-ale`,
  `/blog/crop-science-reviewer-ale`, etc. — orphaned from the `/agriculture` hub,
  which has only `[module]`. Google can't see a coherent agriculture cluster.
- **Action:** create `/agriculture/{soil-science-reviewer, crop-science-reviewer,
  animal-science-reviewer, agri-economics-reviewer, crop-protection-reviewer}`
  mirroring the other verticals; 301 the `/blog/*-ale` URLs to them; wire hub↔spoke
  internal links; update `blogData.js` + sitemap.
- **Failure check (ACCEPT):** if after 60 days the `/agriculture` hub still isn't
  the top-ranked LisensyaPrep URL for "agriculture board exam reviewer", the
  interlinking didn't take.
- **Leading indicator (GROW):** GSC impressions on `/agriculture/*` rising while
  `/blog/*-ale` 301s pass equity (watch for redirect-chain warnings).

### 3.2 Complete the `/medtech` → `/medical-technology` migration — CRITICAL
- **Observation:** `clinical-chemistry-reviewer`, `microbiology-parasitology-reviewer`
  (and a legacy `hematology-reviewer`) still live under `/medtech`, while the
  canonical hub is `/medical-technology`. Authority for MTLE is split across two paths.
- **Action:** move the two missing reviewers to `/medical-technology/*`, 301 all
  `/medtech/*` → `/medical-technology/*`, confirm no page canonicalizes to a
  redirecting URL (the sitemap already patches one such case — remove the need for it).
- **Failure check:** any `/medtech/*` URL still returning 200 (not 301) after deploy.

### 3.3 Automate sitemap route discovery — HIGH
- **Observation:** `sitemap.ts` carries a hand-maintained `SUPPLEMENTAL_CONTENT`
  list because some on-disk pages aren't in `blogData.js`. Manual lists silently
  orphan new pages (they ship but never enter the sitemap).
- **Action:** derive content routes from the filesystem/route manifest at build
  time, or add a CI check that every `app/**/page.jsx` appears in the sitemap.
- **Failure check:** a newly added reviewer page missing from `/sitemap.xml` after deploy.

---

## 4. Growth engine: the seasonal results/schedule playbook — HIGH

PRC/CSC release results and schedules on fixed cycles. Queries like "LET results
March 2026", "MTLE result 2026", "PRC board exam schedule 2026" spike hard and
predictably. You already have `*-passing-rate-results-2026` and `*-schedule-2026`
pages — turn the ad-hoc into a **repeatable annual system**:

1. **Pre-build** each results page ~2 weeks before the expected release, indexed
   and ranking on anticipation queries ("when will LET results be released").
2. **Update within the hour** of release with the actual numbers, top schools,
   passing rate — freshness wins these SERPs.
3. **Interlink** every results page → matching reviewer hub → matching freebie.
4. **Calendarize** all 7 exams' result + schedule dates for the year (see
   CONTENT-CALENDAR).

This is the single highest-ROI recurring motion on the site: high volume,
low competition depth, and it pulls net-new users into the funnel at their moment
of peak intent (just failed / just passed / planning next take).

---

## 5. Funnel closure — HIGH

SEO traffic is only worth what it converts. Enforce a standard CTA chain on every
spoke:

**Reviewer/guide page → matching freebie starter pack → mastery system.**

- Audit that each vertical's reviewer pages CTA to that vertical's starter pack
  (e.g. `/nursing/*` → `pnle-nursing-starter-pack`, `/medical-technology/*` →
  `medical-technology-starter-pack`).
- Add exit-intent / inline freebie capture on high-traffic reviewer pages.
- Ensure `Course` / `Quiz` / `FAQ`-appropriate schema is present (note: FAQPage no
  longer yields a Google rich result as of May 2026 — keep for AI/LLM citation, don't
  add new FAQPage for SERP features; use `QAPage` for genuine Q&A).

---

## 6. Content strategy (next 2 quarters)

**Priority = exam-taker volume × (1 − current depth).** Order:

1. **Agriculture** — after the hub rebuild (§3.1), bring it to parity: application
   guide, coverage, passing-rate, schedule, + per-subject reviewers already drafted.
2. **Medical Technology** — post-migration, expand to ~12 spokes (immunology,
   clinical microscopy, lab management, MTLE study plan, RA 5527).
3. **Pharmacy** — add results/schedule/retake-strategy spokes to match CSE/LET depth.
4. **Tagalog layer** — for each mature vertical, add 2–3 Tagalog spokes
   ("paano pumasa sa [exam]", "libreng [exam] reviewer") — low competition, on-moat.
5. **Cross-exam decision content** — "NCLEX vs PNLE" already performs; add
   "CSE Prof vs SubProf" (exists), "which board exam is easiest", "PRC vs CSC" to
   capture top-of-funnel undecided searchers and route them into verticals.

Cadence: 3–4 spokes/week during term, front-loaded to the pre-results windows.

---

## 7. Technical foundation (maintain)

- **Hreflang:** you serve EN + Tagalog on one domain. These mostly target *different
  queries* (not translations), so this is opportunity, not duplication. Keep language
  targeting explicit in `lang` attributes; only add hreflang pairs where a true EN↔TL
  equivalent of the same page exists.
- **Core Web Vitals:** hold INP < 200ms, LCP < 2.5s on quiz and reviewer pages
  (quiz interactivity is your INP risk). Measure with field data.
- **Schema per page type:** `Course`/`EducationalOccupationalProgram` for mastery
  systems, `Quiz` for modules, `Article` for reviewers, `BreadcrumbList` on all spokes.
- **Connect Google Search Console + GA4** if not already — every KPI below needs it
  for a real baseline (currently unknown).

---

## 8. Implementation roadmap

| Phase | Window | Focus |
|---|---|---|
| **1 — Consolidate** | Weeks 1–4 | Agriculture hub rebuild + 301s (§3.1); `/medtech` migration (§3.2); sitemap automation (§3.3); connect GSC/GA4 |
| **2 — Funnel + Engine** | Weeks 5–12 | Funnel CTA audit (§5); build the results/schedule annual calendar + pre-build templates (§4); schema pass |
| **3 — Scale depth** | Weeks 13–24 | Agriculture & MTLE to parity; Tagalog spoke layer; cross-exam decision content (§6) |
| **4 — Authority** | Months 7–12 | Backlinks (PRC/nursing-org outreach, student forums), review/testimonial signals, thought-leadership on pass strategies |

---

## 9. KPI targets

_Baselines TBD — connect GSC/GA4 first. Targets are directional given ~225 indexed pages._

| Metric | Baseline | 3 mo | 6 mo | 12 mo |
|---|---|---|---|---|
| Indexed pages | ~225 | 240 (post-consolidation, no net loss) | 270 | 320 |
| Organic clicks/mo | TBD | +25% | +60% | +120% |
| Verticals with full spoke set (7 types) | 5/7 | 6/7 | 7/7 | 7/7 + Tagalog layer |
| Freebie signups from organic | TBD | +30% | +75% | 2× |
| Results-page capture (per release event) | ad-hoc | templated | pre-built | pre-built + <1hr update |
| INP (p75, quiz pages) | TBD | <200ms | <200ms | <200ms |

**Success criteria:** zero authority-splitting duplicate paths; every vertical at
architectural parity; a repeatable seasonal-results motion; and a measurable
organic→freebie→mastery funnel.
