import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skip the auto-generated AGENTS.md / CLAUDE.md files.
  agentRules: false,
  async redirects() {
    return [
      { source: "/home-2", destination: "/", permanent: true },
      { source: "/business-2", destination: "/business", permanent: true },
    ];
  },
};

export default nextConfig;
