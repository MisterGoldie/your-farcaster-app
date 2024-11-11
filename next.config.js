/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: 'canvas' }]  // required for three.js
    return config
  },
}

module.exports = nextConfig
