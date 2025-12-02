declare module "@next/mdx" {
  import type { NextConfig } from "next";

  interface MDXConfig {
    extension?: RegExp | RegExp[];
    options?: any;
  }

  export default function createMDX(config?: MDXConfig): (nextConfig: NextConfig) => NextConfig;
}
