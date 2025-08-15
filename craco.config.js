module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add fallbacks for Node.js modules
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        buffer: require.resolve('buffer'),
        util: require.resolve('util'),
        stream: false,
        path: false,
        fs: false,
      };

      return webpackConfig;
    },
  },
};
