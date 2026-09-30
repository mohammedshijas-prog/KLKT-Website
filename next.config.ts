import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skip the auto-generated AGENTS.md / CLAUDE.md files.
  agentRules: false,
  // Let phones and other devices on the local network load the dev server's scripts.
  allowedDevOrigins: ["192.168.1.105"],
  async redirects() {
    return [
      { source: "/home-2", destination: "/", permanent: true },
      { source: "/business-2", destination: "/business", permanent: true },
    ];
  },
};

export default nextConfig;
