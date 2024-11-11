/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: 'canvas' }]
    return config
  },
  async redirects() {
    return [
      {
        source: '/game',
        missing: [
          {
            type: 'query',
            key: 'difficulty'
          },
          {
            type: 'query',
            key: 'piece'
          }
        ],
        permanent: false,
        destination: '/menu'
      }
    ]
  }
}

module.exports = nextConfig
