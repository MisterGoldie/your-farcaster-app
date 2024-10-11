/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; connect-src 'self' https://* wss://ws-us3.pusher.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://vercel.live; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; frame-src 'self' https://vercel.live;"
          },
        ],
      },
    ]
  },
  images: {
    domains: [
      'bafybeidnv5uh2ne54dlzyummobyv3bmc7uzuyt5htodvy27toqqhijf4xu.ipfs.w3s.link',
      // Add other necessary domains here
    ],
  },
}

module.exports = nextConfig
