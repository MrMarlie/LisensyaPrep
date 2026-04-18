# ADSENSE SETUP GUIDE + HOMEPAGE HUB TEMPLATE
# FILE: 06_ADSENSE_AND_HOMEPAGE.md
# ============================================================

## ============================================================
## PART A: GOOGLE ADSENSE SETUP GUIDE
## ============================================================

## IS AD PLACEMENT RANDOM?

Short answer: NO — and YES.
  - YOU choose WHERE the ad slots appear on your page (position, size, format)
  - GOOGLE chooses WHAT ad to show in each slot (based on visitor's browsing history + your content topic)
  - You cannot choose which specific advertisers appear — Google handles that automatically

## THE 3 AD SLOTS SYSTEM (Use This on Every Article)

SLOT 1 — "After Intro" (Highest performing for educational sites)
  Position: After the 2nd or 3rd paragraph of the article, before the first H2 heading
  Format: In-article responsive (auto width)
  Why it works: Reader is engaged but hasn't found their answer yet — high attention moment

SLOT 2 — "Mid-Content" (Second highest performing)
  Position: Between two H2 sections, roughly halfway through the article
  Format: In-article responsive
  Why it works: Reader is still engaged mid-read — good visibility without being intrusive

SLOT 3 — "Below Content" (Catches exit traffic)
  Position: After the article body ends, before the "Related Articles" section
  Format: In-article responsive or display
  Why it works: Reader finished the article — they're deciding what to do next. Good moment for an ad.

OPTIONAL SLOT 4 — "Sidebar Sticky" (Desktop only)
  Position: Right sidebar, sticky (scrolls with user)
  Format: Display 300x250 or 300x600
  Why it works: Always visible on desktop screens during entire read
  Note: Only add if your theme has a sidebar. Don't force a sidebar just for ads.

## WHAT NOT TO DO (Causes AdSense rejection or account suspension)
  ❌ Never place ads above the article headline (before any content)
  ❌ Never put more than 3 in-article ads in one article
  ❌ Never place two ads directly next to each other
  ❌ Never ask readers to click on the ads
  ❌ Never click your own ads (immediate ban)
  ❌ Never put ads on pages with very little content (under 300 words)

## YOUR ADSENSE CODE TEMPLATE
(Replace XXXX values with your actual publisher ID and slot IDs from AdSense dashboard)

```html
<!-- LisensyaPrep AdSense Ad Unit -->
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

## APPLYING FOR ADSENSE — STEP BY STEP

Step 1: Publish at least 25-30 articles (800+ words each)
Step 2: Publish About Us, Privacy Policy, Contact Us pages
Step 3: Connect Google Analytics to your site
Step 4: Submit sitemap to Google Search Console
Step 5: Wait at least 4-6 weeks for your site to get indexed
Step 6: Go to adsense.google.com → Sign Up → Enter your site URL
Step 7: Add the AdSense site verification code to your site's <head>
Step 8: Wait 1-2 weeks for Google to review your application
Step 9: Once approved, create ad units in your AdSense dashboard
Step 10: Replace [AD_SLOT] markers in all your articles with actual ad code

---

## ============================================================
## PART B: HOMEPAGE + PROFESSION HUB TEMPLATE
## ============================================================
## Slug: / (homepage)
## Meta title: LisensyaPrep — Free PRC Board Exam Reviewer Philippines 2026
## Meta description: Free PRC board exam reviewers, practice tests, and study guides for Nursing, Criminology, LET, Pharmacy, Medical Technology, and Agriculture. Pass on your first take.

---

# HOMEPAGE CONTENT STRUCTURE
# (Give this to Claude Code to build the homepage layout)

## SECTION 1: HERO
Headline: "Pass Your PRC Board Exam on the First Take."
Subheadline: "Free reviewers, practice tests, and study guides for 6 professions — written by licensed Filipino professionals."
CTA Button 1: "Pick Your Profession →" (scrolls to profession grid below)
CTA Button 2: "How It Works" (scrolls to about section)
Background: Dark navy blue. Clean, professional. No stock photos.

---

## SECTION 2: PASSING RATE STATS GRID
Title: "By the Numbers — PRC Results 2026"
Subtitle: "Updated after every PRC exam cycle. Source: prc.gov.ph"

Display as 3-column stat cards:

Card 1 — Nursing (PNLE Feb 2026)
  Big number: 44.24%
  Label: Passing Rate
  Sub: 3,611 out of 8,162 examinees passed

Card 2 — Criminology (CLE Feb 2026)
  Big number: 65.99%
  Label: Passing Rate
  Sub: 30,320 out of 45,936 examinees passed

Card 3 — Medical Technology (MTLE Feb 2026)
  Big number: 84.12%
  Label: Passing Rate
  Sub: 7,838 out of 9,317 examinees passed

[Update this section after each PRC announcement — takes 5 minutes to update]

---

## SECTION 3: PROFESSION HUB GRID
Title: "Choose Your Board Exam"
Subtitle: "Deep-dive reviewers for every subject in your profession."

Display as 2x3 card grid (2 columns, 3 rows):

Card 1 — Nursing
  Icon: 💉 stethoscope
  Title: Nursing Board Exam (PNLE / NLE)
  Description: Free practice tests, study plans, and subject reviewers for the Philippine Nurse Licensure Exam.
  Stats: 500 items | 75% passing score | Feb & Aug exams
  Link: /nursing

Card 2 — Criminology
  Icon: 🔍 badge
  Title: Criminology Board Exam (CLE)
  Description: Complete reviewers for all 6 CLE subjects — from Criminal Law to Forensic Science.
  Stats: 45,000+ examinees per cycle | Feb & Aug exams
  Link: /criminology

Card 3 — Education (LET)
  Icon: 📚 graduation cap
  Title: Licensure Exam for Teachers (LET)
  Description: Elementary and Secondary reviewers — Professional Ed, Gen Ed, and Major subjects.
  Stats: Highest volume PRC exam | March & Sept exams
  Link: /education

Card 4 — Pharmacy (PLE)
  Icon: 💊 pill
  Title: Pharmacy Board Exam (PLE)
  Description: Comprehensive reviewers for Pharmacology, Pharmaceutical Chemistry, and Pharmacy Law.
  Stats: PRC Pharmacy Licensure Examination
  Link: /pharmacy

Card 5 — Medical Technology (MTLE)
  Icon: 🧪 microscope
  Title: Medical Technology Board Exam (MTLE)
  Description: Subject-level reviewers for Hematology, Clinical Chemistry, Microbiology, and more.
  Stats: 84% passing rate Feb 2026 | High-demand profession
  Link: /medtech

Card 6 — Agriculture (ALE)
  Icon: 🌾 leaf
  Title: Agriculture Board Exam (ALE)
  Description: Reviewers for Crop Science, Soil Science, Animal Science, and Agricultural Economics.
  Stats: PRC Agriculture Licensure Examination
  Link: /agriculture

---

## SECTION 4: HOW LISENSYAPREP WORKS
Title: "How LisensyaPrep Works"
Display as 3-step visual:

Step 1 — Pick Your Profession
  Icon: 🎯
  Text: "Choose from 6 PRC-regulated professions. Each has its own hub with organized reviewer content."

Step 2 — Study by Subject
  Icon: 📖
  Text: "Every hub has subject-specific articles with practice questions, rationales, and coverage guides."

Step 3 — Practice Until You're Ready
  Icon: ✅
  Text: "Take timed mock exams, review your weak areas, and track your progress before exam day."

---

## SECTION 5: LATEST ARTICLES
Title: "Latest from LisensyaPrep"
Display: 3 most recently published article cards with thumbnail, category tag, title, and date.
These populate automatically from your CMS.

---

## SECTION 6: ABOUT SECTION
Title: "Built for Filipino Board Exam Takers"
Text: "LisensyaPrep was built because board exam prep in the Philippines shouldn't mean hunting through scattered Facebook groups and borrowed reviewer PDFs. Every article here is written or reviewed by a licensed professional who has personally taken the exam they're writing about. No fluff. No generic content. Just honest, structured help."
CTA: "Learn More About Us →" (links to /about)

---

## SECTION 7: FOOTER
Links column 1 — Professions:
  Nursing | Criminology | Education | Pharmacy | Medical Technology | Agriculture

Links column 2 — Resources:
  PRC Exam Schedule | How to Apply via LERIS | Board Exam Tips | Passing Rate Stats

Links column 3 — Site:
  About Us | Privacy Policy | Contact Us | Sitemap

Bottom bar:
  © 2026 LisensyaPrep.com — Free PRC Board Exam Reviewer Philippines
  "LisensyaPrep is an independent study resource. We are not affiliated with the Professional Regulation Commission (PRC)."

---

## ============================================================
## PROFESSION HUB PAGE TEMPLATE (use for /nursing, /criminology, etc.)
## ============================================================

# [PROFESSION NAME] Board Exam — Complete Review Hub
*Your one-stop guide for the [Exam Name] — reviewers, coverage, schedules, and tips.*

## About the [Exam Name]
[2-3 sentences: What is this exam, who administers it, what does passing mean for the career]

## Latest Passing Rate Stats
[Stats card: cycle, examinees, passers, passing rate — sourced from PRC]

## Browse by Subject
[Grid of links to subject-specific reviewer articles]

## Study Guides
[Links to: coverage guide, study plan, application guide, how to pass article]

## Practice Tests
[Links to mock exam articles]

## Upcoming Exam Schedule
[Table: Exam date, application deadline, testing centers, results release date]
[Source link: prc.gov.ph with "Always verify directly with PRC" disclaimer]
