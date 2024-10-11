/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; connect-src 'self' https://* wss://ws-us3.pusher.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://vercel.live; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; frame-src 'self' https://vercel.live; media-src 'self' https://bafybeiec5czbnll2ochunnvjnky2mijpoqrplpadob4ojuc7ebfmuk2yma.ipfs.w3s.link;"
          },
        ],
      },
    ]
  },
  images: {
    domains: [
      'bafybeidnv5uh2ne54dlzyummobyv3bmc7uzuyt5htodvy27toqqhijf4xu.ipfs.w3s.link',
      'bafybeifzk7uojcicnh6yhnqvoldkpzuf32sullm34ela266xthbidca6ny.ipfs.w3s.link',
      'bafybeie6qqm6r24chds5smesevkrdsg3jqmgw5wdmwzat7zdze3ukcgd5m.ipfs.w3s.link',
      'bafybeiddxtdntzltw5xzc2zvqduhi6nnb7viesov4.ipfs.w3s.link',
      'bafybeiec5czbnll2ochunnvjnky2mijpoqrplpadob4ojuc7ebfmuk2yma.ipfs.w3s.link'
    ],
  },
}

module.exports = nextConfig
