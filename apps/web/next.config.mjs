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
    }
};

export default nextConfig;
