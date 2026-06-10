/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — no server, no database. Outputs plain HTML/CSS/JS to /out.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
