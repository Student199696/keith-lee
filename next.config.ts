import type { NextConfig } from "next";
import path from "node:path";

const isVercel = process.env.VERCEL === "1";
const cloudflareShim = path.resolve(process.cwd(), "lib/cloudflare-workers-vercel.ts");

const nextConfig: NextConfig = {
  ...(isVercel ? {
    turbopack: { root: process.cwd(), resolveAlias: { "cloudflare:workers": "./lib/cloudflare-workers-vercel.ts" } },
    webpack(config, { webpack }) {
      config.resolve.alias["cloudflare:workers"] = cloudflareShim;
      config.plugins.push(new webpack.NormalModuleReplacementPlugin(/^cloudflare:workers$/, cloudflareShim));
      return config;
    },
  } : {}),
};

export default nextConfig;
