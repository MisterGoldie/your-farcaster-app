import { Metadata } from 'next'

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  openGraph: {
    images: [`${process.env.NEXT_PUBLIC_URL}/game-preview.png`],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${process.env.NEXT_PUBLIC_URL}/game-preview.png`,
    'fc:frame:button:1': 'Play Now',
    'fc:frame:post_url': `${process.env.NEXT_PUBLIC_URL}/api/frame`,
    'fc:custom:mini_app_id': process.env.NEXT_PUBLIC_APP_NAME?.toLowerCase().replace(/\s+/g, '-') || '',
    'fc:custom:base_url': process.env.NEXT_PUBLIC_URL || '',
  },
}
