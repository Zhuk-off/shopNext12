/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout: 86400,
  images: {
    domains: [
      'i.ibb.co',
      'via.placeholder.com',
      process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL?.match(
        /(?!(w+)\.)\w*(?:\w+\.)+\w+/
      )[0],
      'cdn21vek.by',
    ],
  },
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig;
