/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    unoptimized: process.env.IMAGE_UNOPTIMIZE == "true",
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
