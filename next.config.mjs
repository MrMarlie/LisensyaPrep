/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/medtech/hematology-reviewer',
        destination: '/medical-technology/hematology-reviewer',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
