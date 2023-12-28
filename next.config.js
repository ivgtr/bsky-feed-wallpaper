/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.bsky.app"],
  },
};

module.exports = nextConfig;
