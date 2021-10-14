/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  images: {
    domains: ['localhost'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/a/my-library',
        permanent: true,
      },
    ]
  }
}
