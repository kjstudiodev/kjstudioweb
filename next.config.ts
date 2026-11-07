import type { NextConfig } from "next";

const config: NextConfig = {
  devIndicators: false,
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
};

export default config;
