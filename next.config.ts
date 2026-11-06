import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

const config: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [{ source: "/", destination: "/es", permanent: false }];
  },
};

export default config;
