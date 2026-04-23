import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/blogData';

const BASE_URL = 'https://lisensyaprep.com';

const AGRICULTURE_MODULES = [
  'crop-science',
  'soil-science',
  'agricultural-economics',
  'crop-protection',
  'animal-science',
  'agricultural-extension',
];

const EDUCATION_MODULES = [
  'general-education',
  'professional-education',
  'english',
  'filipino',
  'mathematics',
  'biological-science',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/agriculture`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/education`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/criminology`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/criminology/criminal-jurisprudence-procedure-reviewer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/criminology/criminalistics-dactyloscopy-reviewer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/criminology/law-enforcement-administration-reviewer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/education/how-to-pass-let-first-take`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const agricultureModuleRoutes: MetadataRoute.Sitemap = AGRICULTURE_MODULES.map((mod) => ({
    url: `${BASE_URL}/agriculture/${mod}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const educationModuleRoutes: MetadataRoute.Sitemap = EDUCATION_MODULES.map((mod) => ({
    url: `${BASE_URL}/education/${mod}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...agricultureModuleRoutes, ...educationModuleRoutes, ...blogRoutes];
}
