/** @type {import('next').NextConfig} */
const nextConfig = {
  // Builds to plain static files in out/ (host anywhere: Netlify, Vercel, GitHub Pages)
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
