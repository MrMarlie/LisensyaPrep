# ============================================================
# CLAUDE CODE MASTER INSTRUCTIONS — LisensyaPrep.com
# FILE: 00_CLAUDE_CODE_INSTRUCTIONS.md
# READ THIS FILE FIRST BEFORE USING ANY OTHER FILE IN THIS KIT
# ============================================================

## ABOUT THIS KIT

This folder contains ready-to-publish SEO content for LisensyaPrep.com.
Each file is a fully written, SEO-optimized article with:
  - Metadata (title, description, slug, keywords)
  - Structured article body with H1, H2, H3 headings
  - AdSense ad slot markers
  - Image placeholder markers
  - Schema markup (JSON-LD) for Google rich results
  - Internal linking suggestions

---

## FILES IN THIS KIT

| File | Content |
|------|---------|
| 00_CLAUDE_CODE_INSTRUCTIONS.md | THIS FILE — read first |
| 01_NLE_how-to-pass-first-take.md | NLE article — nursing board exam tips |
| 02_CLE_how-to-pass-criminology-board-exam.md | CLE article — criminology board exam tips |
| 03_IMAGE_and_INFOGRAPHIC_GUIDE.md | What images to create + data to display |
| 04_ARTICLE_TEMPLATE.md | Blank template — use for every new article |
| 05_TRUST_PAGES.md | About Us, Privacy Policy, Contact Us — ready to paste |
| 06_ADSENSE_SETUP_GUIDE.md | Where to place ads, what code to use |
| 07_HOMEPAGE_HUB_TEMPLATE.md | Homepage and profession hub page structure |

---

## HOW TO USE THESE FILES WITH CLAUDE CODE

When you paste a file into Claude Code, give it this prompt:

### For a new article page:
"I'm building LisensyaPrep.com — a PRC board exam reviewer site built on [WordPress / Next.js / your CMS].
Here is a fully written SEO article. Please:
1. Create the page at the slug specified in the file
2. Apply the SEO meta title and description
3. Insert AdSense ad units at each [AD_SLOT] marker using this ad code: [paste your AdSense code]
4. Add placeholder image blocks at each [FEATURED_IMAGE] and [INFOGRAPHIC_SLOT] marker
5. Apply the JSON-LD schema markup in the <head>
6. Make all internal links relative to the site root
Here is the article content: [paste the .md file content]"

### For setting up the homepage:
"Here is my homepage hub structure for LisensyaPrep.com.
Please build this as the homepage — it should link to each profession hub page and display the passing rate stats grid."

### For trust pages:
"Please create these three pages on my site: About Us, Privacy Policy, and Contact Us.
Here is the content: [paste 05_TRUST_PAGES.md]"

---

## ADSENSE SLOT SYSTEM

Every article uses 3 ad slots. Replace the markers with your actual AdSense code.

[AD_SLOT_1] → After the intro paragraph (before first H2)
[AD_SLOT_2] → Midway through content (between H2 sections)
[AD_SLOT_3] → Below the article body (before related links)

Your AdSense responsive ad code looks like this (replace with your actual pub ID):
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

You get your pub ID and ad slot numbers from your AdSense dashboard after approval.

---

## IMAGE SLOT SYSTEM

[FEATURED_IMAGE] → Hero image at top of article
[INFOGRAPHIC_SLOT_1] → First infographic (coverage breakdown)
[INFOGRAPHIC_SLOT_2] → Second infographic (stats/quick facts)

For each slot, Claude Code should insert:
```html
<figure>
  <img src="/images/[filename].png" alt="[alt text from image guide]" width="800" loading="lazy" />
  <figcaption>[caption text]</figcaption>
</figure>
```

---

## SITE TECHNICAL REQUIREMENTS (Tell Claude Code these)

- HTTPS must be enabled (required for AdSense)
- Site must load in under 3 seconds (use lazy loading on images)
- Mobile responsive (AdSense requires this)
- Must have sitemap.xml submitted to Google Search Console
- Must have robots.txt file
- Install Google Analytics AND Google Search Console before applying for AdSense

---

## PAGES YOU MUST HAVE BEFORE APPLYING FOR ADSENSE

[ ] Homepage with clear site purpose
[ ] About Us page (see 05_TRUST_PAGES.md)
[ ] Privacy Policy page (see 05_TRUST_PAGES.md)
[ ] Contact Us page (see 05_TRUST_PAGES.md)
[ ] At least 20-30 published articles (500+ words each)
[ ] All pages HTTPS
[ ] No broken links
[ ] Google Analytics connected
[ ] Google Search Console submitted

---

## CONTENT RULES (Remind Claude Code of these)

1. Every article must have a unique meta title and meta description
2. The H1 heading must contain the target keyword naturally
3. No two articles target the same primary keyword
4. Every article must have at least one internal link to another LisensyaPrep page
5. Every article must cite official PRC source (prc.gov.ph) when referencing exam data
6. Author name and credential must appear on every article
7. "Last Updated" date must appear on every article
8. Tables, bullet points, and numbered lists improve readability — use them
