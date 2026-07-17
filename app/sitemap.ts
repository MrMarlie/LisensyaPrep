import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/blogData';

const BASE_URL = 'https://lisensyaprep.com';

type ChangeFreq = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

// Parse human-readable post dates like "June 1, 2026" -> Date. Falls back to now
// if the string is missing or unparseable, so a single bad date never breaks the build.
function parseDate(input?: string): Date {
  if (!input) return new Date();
  const d = new Date(input);
  return isNaN(d.getTime()) ? new Date() : d;
}

// The canonical URL for a blog post: its section URL when set, otherwise the /blog/ slug.
function canonicalPath(post: { slug: string; url?: string }): string {
  return post.url || `/blog/${post.slug}`;
}

// Real content pages that are NOT represented in BLOG_POSTS but exist as routes on disk.
const SUPPLEMENTAL_CONTENT = [
  '/criminology/criminal-jurisprudence-procedure-reviewer',
  '/criminology/criminalistics-dactyloscopy-reviewer',
  '/criminology/law-enforcement-administration-reviewer',
  '/education/let-gen-ed-mastery-study-plan-2026',
  '/education/let-prof-ed-mastery-study-plan-2026',
  '/nursing/pnle-reviewer-with-rationale',
];

// Profession/topic landing pages. Note: /medtech has no landing page (its canonical
// section is /medical-technology), so it is intentionally excluded.
const SECTION_LANDINGS = [
  '/agriculture',
  '/education',
  '/criminology',
  '/civil-service',
  '/nursing',
  '/pharmacy',
  '/medical-technology',
  '/nclex',
];

const FREEBIES = [
  'let-profed-starter-pack',
  'let-gen-ed-starter-pack',
  'cse-pro-starter-pack',
  'cse-subprof-starter-pack',
  'cle-starter-pack',
  'agriculture-starter-pack',
  'medical-technology-starter-pack',
  'pnle-nursing-starter-pack',
].map((s) => `/freebies/${s}`);

const PREMIUM = [
  'let-profed-mastery',
  'let-gen-ed-mastery',
  'let-bundle-mastery',
  'cse-pro-mastery',
  'cse-subprof-mastery',
  'cse',
  'cle-mastery',
  'agri-mastery',
  'mtle-mastery',
  'pnle-mastery',
].map((s) => `/premium/${s}`);

const INFO_PAGES = ['/about', '/contact', '/privacy', '/terms', '/disclosure'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // Keyed by full URL so any accidental overlap (e.g. a post whose canonical equals a
  // landing page) collapses to a single entry — first writer wins.
  const entries = new Map<string, MetadataRoute.Sitemap[number]>();

  const add = (
    path: string,
    opts: { lastModified?: Date; changeFrequency?: ChangeFreq; priority?: number } = {}
  ) => {
    const url = path === '/' ? BASE_URL : `${BASE_URL}${path}`;
    if (entries.has(url)) return;
    entries.set(url, {
      url,
      lastModified: opts.lastModified ?? now,
      changeFrequency: opts.changeFrequency ?? 'monthly',
      priority: opts.priority ?? 0.6,
    });
  };

  // Core
  add('/', { changeFrequency: 'weekly', priority: 1.0 });
  add('/blog', { changeFrequency: 'daily', priority: 0.8 });

  // Tools
  add('/tools/prc-grade-calculator', { changeFrequency: 'monthly', priority: 0.8 });
  add('/tools/study-planner', { changeFrequency: 'monthly', priority: 0.8 });
  add('/tools/requirements-checker', { changeFrequency: 'monthly', priority: 0.8 });

  // Landing pages
  SECTION_LANDINGS.forEach((p) => add(p, { changeFrequency: 'weekly', priority: 0.9 }));
  FREEBIES.forEach((p) => add(p, { changeFrequency: 'monthly', priority: 0.9 }));
  PREMIUM.forEach((p) => add(p, { changeFrequency: 'monthly', priority: 0.8 }));
  INFO_PAGES.forEach((p) => add(p, { changeFrequency: 'yearly', priority: 0.3 }));

  // Content pages — always the canonical destination, stamped with the real content date.
  BLOG_POSTS.forEach((post) =>
    add(canonicalPath(post), {
      lastModified: parseDate(post.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  );
  SUPPLEMENTAL_CONTENT.forEach((p) =>
    add(p, { changeFrequency: 'monthly', priority: 0.7 })
  );

  return Array.from(entries.values());
}
