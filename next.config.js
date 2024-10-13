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
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live blob:; worker-src 'self' blob:;"
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
