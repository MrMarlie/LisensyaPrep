#!/usr/bin/env node
/**
 * Sitemap coverage guard.
 *
 * Every exam-vertical spoke page on disk (app/<vertical>/<slug>/page.jsx) must be
 * reachable from the sitemap — either via a BLOG_POSTS `url` in lib/blogData.js or
 * an explicit path listed in app/sitemap.ts (SUPPLEMENTAL_CONTENT / landings).
 *
 * The sitemap is assembled from hand-maintained lists, so a new page added without
 * a matching entry would silently never get indexed. This check fails the build
 * (non-zero exit) the moment that happens, turning a silent SEO leak into a loud one.
 *
 * Runs in CI/prebuild on any platform (pure Node, no shell).
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const APP = join(ROOT, 'app');

// Exam verticals whose subdirectories are indexable spoke pages.
const VERTICALS = [
  'nursing',
  'education',
  'civil-service',
  'criminology',
  'pharmacy',
  'medical-technology',
  'agriculture',
  'nclex',
];

// Dynamic segments and non-content dirs that are not standalone spokes.
const SKIP = new Set(['[module]', '[slug]']);

function contentRoutesOnDisk() {
  const routes = [];
  for (const vertical of VERTICALS) {
    const dir = join(APP, vertical);
    if (!existsSync(dir)) continue;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory() || SKIP.has(entry.name)) continue;
      if (existsSync(join(dir, entry.name, 'page.jsx'))) {
        routes.push(`/${vertical}/${entry.name}`);
      }
    }
  }
  return routes;
}

function coveredRoutes() {
  const blogData = readFileSync(join(ROOT, 'lib', 'blogData.js'), 'utf8');
  const sitemap = readFileSync(join(APP, 'sitemap.ts'), 'utf8');
  const covered = new Set();
  // url: '/vertical/slug' entries in blogData
  for (const m of blogData.matchAll(/url:\s*['"](\/[^'"]+)['"]/g)) covered.add(m[1]);
  // any quoted '/path' literal in sitemap.ts (SUPPLEMENTAL_CONTENT, landings, etc.)
  for (const m of sitemap.matchAll(/['"](\/[^'"]+)['"]/g)) covered.add(m[1]);
  return covered;
}

const onDisk = contentRoutesOnDisk();
const covered = coveredRoutes();
const orphans = onDisk.filter((r) => !covered.has(r));

if (orphans.length) {
  console.error('\n✗ Sitemap coverage check FAILED — these pages exist but are not in the sitemap:\n');
  for (const r of orphans) console.error(`    ${r}`);
  console.error(
    '\nFix: add a BLOG_POSTS entry with `url: \'<route>\'` in lib/blogData.js, ' +
      'or list the route in SUPPLEMENTAL_CONTENT in app/sitemap.ts.\n'
  );
  process.exit(1);
}

console.log(`✓ Sitemap coverage OK — all ${onDisk.length} vertical spoke pages are in the sitemap.`);
