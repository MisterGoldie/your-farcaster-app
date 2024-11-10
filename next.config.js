/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'bafybeiemb5ddkibe2hl4z5iqd5x2wzrkskf5swqu6gksp7yub4lqtczlhu.ipfs.w3s.link',
      'bafybeicodlej4oiq6fq5lfztym5tvgndslczfqyvquvpamdloqvjrf7lly.ipfs.w3s.link',
      'bafybeif6r7nj3qvhwc7ivbep7b7loihjpwswnz22qamdte26pcbsxdqgke.ipfs.w3s.link',
      'i.imgur.com',
      'imgur.com',
      'imagedelivery.net',
      'res.cloudinary.com',
      'wrpcd.net',
      'cdn.stamp.fyi',
      'ipfs.decentralized-content.com',
      'gw.ipfs-lens.dev'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ipfs.w3s.link',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '**.ipfs.cf-ipfs.com',
        pathname: '**',
      }
    ]
  },
  webpack: (config, { isServer }) => {
    config.externals = [...config.externals, { canvas: 'canvas' }];
    
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
          fs: false,
          net: false,
          tls: false,
          canvas: false
        },
        alias: {
          ...config.resolve.alias,
          'react-dom': '@hot-loader/react-dom'
        }
      }
    }

    return config;
  },
  
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  reactStrictMode: false,
}

module.exports = nextConfig
