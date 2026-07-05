/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Legacy /medtech section fully migrated to /medical-technology.
      // Wildcard 301 covers the bare hub and every reviewer path.
      {
        source: '/medtech',
        destination: '/medical-technology',
        permanent: true,
      },
      {
        source: '/medtech/:slug*',
        destination: '/medical-technology/:slug*',
        permanent: true,
      },
      // Agriculture reviewers/guides moved from /blog into the /agriculture hub
      // so the vertical concentrates topical authority like every other exam.
      ...[
        'agri-economics-reviewer-ale',
        'ale-application-guide-2026',
        'ale-coverage-2026',
        'ale-crop-protection-reviewer',
        'ale-passing-rate-results-2026',
        'animal-science-reviewer-ale',
        'crop-science-reviewer-ale',
        'soil-science-reviewer-ale',
        'how-to-pass-agriculture-board-exam',
      ].map((slug) => ({
        source: `/blog/${slug}`,
        destination: `/agriculture/${slug}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
