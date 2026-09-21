import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Case studies are .mdx files in content/case-studies.
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    // Project screenshots are local files in public/projects. No remote hosts.
    formats: ["image/avif", "image/webp"],
  },
};

// No remark/rehype plugins yet. Every one of them ships bytes or build time,
// and the two case studies do not need syntax highlighting or GFM tables yet.
const withMDX = createMDX({});

export default withMDX(nextConfig);
