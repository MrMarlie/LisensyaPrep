# LisensyaPrep — Results & Schedule Calendar

_Living tracker for the seasonal results engine (SEO-STRATEGY.md §4). Last updated 2026-07-05._

Result-release days are the biggest, most predictable traffic spikes on a PRC/CSC
exam site. This tracker makes sure a results page is **already indexed and ranking
before** each release, then updated the moment numbers drop.

## ⚠️ The golden rule

**Every predicted date below is an ESTIMATE. Always confirm the real exam date and
watch for the result announcement at [prc.gov.ph](https://www.prc.gov.ph) (or
[csc.gov.ph](https://www.csc.gov.ph) for CSE) before you act on it.** PRC/CSC shift
dates without notice. Cycles here come from your own schedule page, which itself
says "typical cycles — verify."

## How to run it — the 3-beat playbook

For each exam event:

1. **T-2 weeks (before predicted release):** publish/refresh the results page in
   "waiting" mode — it ranks on anticipation queries ("when will [exam] results be
   released"). Set `dateModified` to now.
2. **Release hour:** flip it to real data — overall passing rate, topnotchers, top
   schools, how to check online. Update `datePublished`/`dateModified`. Freshness
   wins these SERPs; first + fastest takes the traffic.
3. **Always:** interlink results page → reviewer hub → freebie starter pack. The
   examinee who just failed is your highest-intent lead.

## Status legend

⬜ not started · 🟨 pre-built (waiting mode) · ✅ live with real results · ⏭️ passed this cycle

---

## Upcoming — act on these next (2nd-half 2026 sittings)

| Exam | Typical cycle | Exam date (VERIFY) | Predicted result window (EST) | Results page | Freebie to interlink | Status |
|------|---------------|--------------------|-------------------------------|--------------|----------------------|--------|
| **PNLE** (Nursing) | Feb & **Aug** | Aug 2026 — verify | ~days after exam (NLE is fast) — verify | `/nursing/pnle-passing-rate-results-2026` | `pnle-nursing-starter-pack` | ⬜ |
| **CLE** (Criminology) | Feb & **Aug** | Aug 2026 — verify | ~2–3 wks after exam (est) | `/criminology/cle-passing-rate-results-2026` | `cle-starter-pack` | ⬜ |
| **MTLE** (Med Tech) | Feb & **Aug** | Aug 2026 — verify | ~1–2 wks after exam (est) | `/medical-technology/mtle-application-results-2026` | `medical-technology-starter-pack` | ⬜ |
| **LET** (Teachers) | Mar & **Sep** | Sep 2026 — verify | **~37 working days** after exam (confirmed from Mar 2026) | `/education/let-passing-rate-results-2026` | `let-profed-starter-pack` / `let-gen-ed-starter-pack` | ⬜ |
| **CSE** (Civil Service) | Mar & **Aug** | Aug 2026 — verify (CSC) | **slow — often 1.5–2 months** (est) | `/civil-service/cse-passing-rate-2026` | `cse-pro-starter-pack` / `cse-subprof-starter-pack` | ⬜ |
| **PLE** (Pharmacy) | Jun & **Nov** | Nov 2026 — verify | ~days after exam (est) | `/pharmacy/ple-passing-rate-results-2026` | ⚠️ none — see gap below | ⬜ |
| **ALE** (Agriculture) | check prc.gov.ph | TBD — verify | TBD | `/agriculture/ale-passing-rate-results-2026` | `agriculture-starter-pack` | ⬜ |

## Already passed this cycle (1st-half 2026 — for reference / next-year prep)

| Exam | Sitting | Exam date | Actual result date | Notes |
|------|---------|-----------|--------------------|-------|
| LET | Mar 2026 | Mar 15, 2026 | **May 12, 2026** | 37 working days later — your confirmed lag anchor. Page: `/education/let-march-2026-results` |
| PNLE | Feb 2026 | verify | record it → | fill in to sharpen the Aug prediction |
| CLE | Feb 2026 | verify | record it → | |
| MTLE | Feb 2026 | verify | record it → | |
| CSE | Mar 2026 | verify (CSC) | record it → | |
| PLE | Jun 2026 | verify | record it → | |

> **Tip:** each time results actually drop, record the exam→release gap in the
> "Actual" column. After one full cycle you'll have exact per-exam lags, and next
> year's predicted windows become tight instead of estimated.

---

## Per-exam release-lag reference (ESTIMATES — replace with your observed actuals)

- **LET** — ~37 working days (✅ confirmed: Mar 15 → May 12, 2026). The slowest; pre-build early.
- **PNLE / PLE** — fast, often within days of the exam. Pre-build in "waiting" mode a week out and be ready to flip same-day.
- **CLE / MTLE** — roughly 1–3 weeks (estimate).
- **ALE** — varies; no fixed public cycle — watch prc.gov.ph.
- **CSE** — slowest of all (CSC); commonly 1.5–2+ months. Long ranking runway on anticipation queries.

## Known gap 🚩

**Pharmacy (PLE) has no freebie or mastery product.** When the PLE results spike hits,
there's nothing to convert that traffic to. Either create a `ple-starter-pack`
(Phase 3) or, short-term, point the PLE results page at the most relevant existing
offer. Everything else in the funnel is wired (Phase 2).

## Maintenance

- Review this file at the **start of each month** — anything with a predicted release
  in the next ~6 weeks moves to 🟨 pre-built.
- After each release, set the row ✅, fill the actual date, and roll the exam forward
  to its next 2026/2027 sitting.
