/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Add file-loader for audio files
    config.module.rules.push({
      test: /\.(mp3)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/sounds/[name][ext]'
      }
    })

    // Add externals for three.js
    config.externals = [...(config.externals || []), { canvas: 'canvas' }]

    return config
  },
  // Add custom headers for audio files
  async headers() {
    return [
      {
        source: '/static/sounds/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
