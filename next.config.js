/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      poll: true,
      ignored: /node_modules/,
    };
    return config;
  },
};

module.exports = nextConfig;
