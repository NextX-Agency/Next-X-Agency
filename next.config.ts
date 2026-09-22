import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // The example prototypes use stock photography for their made-up businesses.
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
}

export default nextConfig
