/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'bafybeidnv5uh2ne54dlzyummobyv3bmc7uzuyt5htodvy27toqqhijf4xu.ipfs.w3s.link',
      'bafybeifzk7uojcicnh6yhnqvoldkpzuf32sullm34ela266xthbidca6ny.ipfs.w3s.link'
    ],
  },
  async headers() {
    const ContentSecurityPolicy = `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live blob:;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' data:;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' https://*.vercel.app;
      worker-src 'self' blob:;
    `;
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
          }
        ]
      }
    ];
  },
  webpack: (config) => {
    config.externals.push({
      'react-native-config': 'react-native-config',
    })
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    })
    return config
  },
}

module.exports = nextConfig