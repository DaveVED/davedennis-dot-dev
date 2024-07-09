import withMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

const mdxConfig = {
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
  },
};

const nextConfig = {
  /**
   * For static site I *must* have export set. When export is set you
   * can run pnpm build, and it will create the out folder for you.
   * Moving away from this for now.
   *
   * output: 'export',
   */

  /**
   * When we use static exports and we want to use the next <Image /> tag
   * Next.js image optimization feature will not work because it relies on
   * server-side processing. Setting unoptimized: true allows you to
   * bypass this limitation and use the images as they are.
   * images: {
   *   unoptimized: true,
   * },
   */

  reactStrictMode: true,
  transpilePackages: ["@repo/ui", "next-mdx-remote"],
  pageExtensions: ["ts", "tsx", "md", "mdx", "js"],
  images: {
    domains: ["github.com", "raw.githubusercontent.com"],
  },
  output: "standalone",
  /**
   * Allows us to use /source instead of a fully qualified domain.
   * For example <a href="/twitter" target="_blank"> would
   * route to the source here.
   */
  async redirects() {
    return [
      {
        source: "/(x|twitter)",
        destination: "https://x.com/DaveVED_",
        permanent: false,
      },
      {
        source: "/twitch",
        destination: "https://www.twitch.tv/daveved",
        permanent: false,
      },
      {
        source: "/discord",
        destination: "https://discordapp.com/users/daveved/",
        permanent: false,
      },
      {
        source: "/linkedin",
        destination: "https://www.linkedin.com/in/davedennis93/",
        permanent: false,
      },
      {
        source: "/github",
        destination: "https://github.com/DaveVED/",
        permanent: false,
      },
    ];
  },
};

export default withMDX(mdxConfig)(nextConfig);
