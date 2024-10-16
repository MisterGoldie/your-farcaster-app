/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'bafybeiemb5ddkibe2hl4z5iqd5x2wzrkskf5swqu6gksp7yub4lqtczlhu.ipfs.w3s.link',
      'bafybeicodlej4oiq6fq5lfztym5tvgndslczfqyvquvpamdloqvjrf7lly.ipfs.w3s.link',
      'bafybeif6r7nj3qvhwc7ivbep7b7loihjpwswnz22qamdte26pcbsxdqgke.ipfs.w3s.link'
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; connect-src 'self' https://* wss://ws-us3.pusher.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://vercel.live; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: https://*.ipfs.w3s.link; frame-src 'self' https://vercel.live;"
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://*.farcaster.xyz https://*.warpcast.com;"
          },
          {
            key: 'X-Frame-Options',
            value: 'ALLOW-FROM https://*.farcaster.xyz https://*.warpcast.com'
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://*.farcaster.xyz, https://*.warpcast.com'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Farcaster-User'
          }
        ],
      },
    ]
  },
  webpack: (config, { isServer }) => {
    // Add your custom webpack configuration here
    // https://webpack.js.org/configuration/
    // https://nextjs.org/docs/api-reference/next.config.js/webpack
    return config
  },
}

module.exports = nextConfig;
