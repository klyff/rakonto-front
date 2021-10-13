/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/a/my-libary',
        permanent: true,
      },
    ]
  }
}
