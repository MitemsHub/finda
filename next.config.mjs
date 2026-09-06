/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep the production build lean: cap Next's parallel static-generation
  // workers and disable build telemetry so large multi-core builders don't
  // balloon memory during `next build`.
  experimental: {
    cpus: 2,
  },
  telemetry: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
    ],
  },
};

export default nextConfig;
