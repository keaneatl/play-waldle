/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "where-is-waldo-5082c.appspot.com",
      "localhost",
      "firebasestorage.googleapis.com",
    ],
  },
};

module.exports = nextConfig;
