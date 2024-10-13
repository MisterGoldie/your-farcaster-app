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
            value: "default-src 'self'; connect-src 'self' https://* wss://ws-us3.pusher.com blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://vercel.live; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: https://*.ipfs.w3s.link blob:; frame-src 'self' https://vercel.live; worker-src blob: 'self'; child-src blob:;"
          },
        ],
      },
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|glb|gltf)$/i,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/images',
          outputPath: 'static/images/',
        },
      },
    })
    return config
  },
}

module.exports = nextConfig
