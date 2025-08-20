import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**", // ✅ allow all paths under picsum.photos
      },
    ],
  },
};

export default nextConfig;
