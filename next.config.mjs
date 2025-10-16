import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'export', // Dodaj ovu liniju za static export
  basePath: process.env.BASE_PATH || '',
  images: {
    unoptimized: true, // Potrebno za static export
  },
};

export default withMDX(config);
