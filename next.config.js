/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'bafybeidnv5uh2ne54dlzyummobyv3bmc7uzuyt5htodvy27toqqhijf4xu.ipfs.w3s.link',
      'bafybeifzk7uojcicnh6yhnqvoldkpzuf32sullm34ela266xthbidca6ny.ipfs.w3s.link'
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live blob:; worker-src 'self' blob:; connect-src 'self' https://*.vercel.app;"
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
