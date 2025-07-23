import type { NextConfig } from "next";

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Disable ESLint checks during build
  },
};

module.exports = nextConfig;
