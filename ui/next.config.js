/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_VIEW_PR_URL: process.env.NEXT_PUBLIC_VIEW_PR_URL,
  },
};

module.exports = nextConfig;
