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
        ],
      },
    ]
  },
  webpack: (config) => {
    config.externals.push({
      'react-native-config': 'react-native-config',
    })
    return config
  },
}

module.exports = nextConfig
