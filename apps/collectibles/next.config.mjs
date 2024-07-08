const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui'],
  pageExtensions: ['ts', 'tsx', 'md', 'mdx', 'js'],
  output: 'standalone',
};

export default nextConfig;
