import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/index", destination: "/", permanent: true },
      { source: "/news/:slug", destination: "/article/:slug", permanent: false },
    ];
  },
  images: {
    // Allow next/image to fetch media served on private/LAN IPs (e.g. Laravel storage).
    // Safe for self-hosted stacks; avoid on public multi-tenant apps.
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.29.186',
        port: '8000',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;