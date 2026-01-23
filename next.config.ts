import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  output: "export", // tells Next to generate a static export
  reactCompiler: true,
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "engineering.nyu.edu",
      },
      {
        protocol: "https",
        hostname: "vida.engineering.nyu.edu",
      },
    ],
  },
};

export default withMDX(nextConfig);
