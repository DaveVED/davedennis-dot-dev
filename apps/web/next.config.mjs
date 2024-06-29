import withMDX from "@next/mdx";

const nextConfig = withMDX({
  extension: /\.mdx?$/,
})({
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  transpilePackages: ["@repo/ui", "next-mdx-remote"],
  pageExtensions: ["ts", "tsx", "md", "mdx", "js"],
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
});

export default nextConfig;
