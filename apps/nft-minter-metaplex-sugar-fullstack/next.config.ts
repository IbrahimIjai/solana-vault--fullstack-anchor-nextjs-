import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'via.placeholder.com',
      'picsum.photos',
      'source.unsplash.com',
      'cloudflare-ipfs.com',
      'arweave.net',
      'ipfs.io',
      'cdn.pixabay.com',
      'solana-nft.imgix.net'
    ],
  },
  reactStrictMode: true,
  swcMinify: true
}

export default nextConfig
