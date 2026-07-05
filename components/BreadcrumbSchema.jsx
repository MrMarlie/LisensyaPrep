import Script from 'next/script';

const BASE = 'https://lisensyaprep.com';

// Emits BreadcrumbList JSON-LD that mirrors the on-page breadcrumb nav so Google
// can render breadcrumb rich results. `items` is ordered root -> current page:
// [{ name: 'Home', url: '/' }, { name: 'Pharmacy', url: '/pharmacy' }, ...].
// Relative urls are resolved against the canonical origin; absolute urls pass through.
export default function BreadcrumbSchema({ items }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url.startsWith('http') ? it.url : `${BASE}${it.url}`,
    })),
  };
  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
