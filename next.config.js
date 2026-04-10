const path = require("path");

/** @type {import('next').NextConfig} */
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";
const isProjectPage = repo && !repo.endsWith(".github.io");
const basePath = isProjectPage ? `/${repo}` : "";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true },
  turbopack: {
    root: path.join(__dirname),
  },
};

module.exports = nextConfig;
