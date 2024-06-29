/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
        /**
         * TODO: Come back to this, and see if we can use CloudFront custom loader. Lazy right now.
         * https://nextjs.org/docs/pages/api-reference/components/image#loaderfile
         * https://nextjs.org/docs/app/api-reference/next-config-js/images#example-loader-configuration
         */
        unoptimized: true,
    },
    reactStrictMode: true,
    transpilePackages: ["@repo/ui"],
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
        ];
      },
};

export default nextConfig;
