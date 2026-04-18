import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/quiz/', '/results', '/auth/'],
      },
    ],
    sitemap: 'https://lisensyaprep.com/sitemap.xml',
  };
}
