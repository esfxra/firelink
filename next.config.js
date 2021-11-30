// next.config.js
module.exports = {
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'localhost',
      'avatars.githubusercontent.com',
      'secure.gravatar.com',
    ],
  },
  swcMinify: true,
};
