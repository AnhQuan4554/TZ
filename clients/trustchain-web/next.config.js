const path = require('path');
const withTM = require('next-transpile-modules')([
  // Uncomment this if you're using Fullcalendar features
  // '@fullcalendar/common',
  // '@fullcalendar/react',
  // '@fullcalendar/daygrid',
  // '@fullcalendar/list',
  // '@fullcalendar/timegrid',
  // '@fullcalendar/timeline',
  '@tymlez/common-libs',
  '@tymlez/devias-material-kit',
]);

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(
  withTM({
    reactStrictMode: true,
    trailingSlash: true,
    basePath: '/trustchain',

    images: {
      loader: 'custom',
    },
    /**
     *
     * @param {any} webpackConfig
     * @returns
     */
    webpack(webpackConfig) {
      webpackConfig.module.rules.push({
        test: /\.svg$/i,
        issuer: { and: [/\.(js|ts|md)x?$/] },
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: { plugins: [{ removeViewBox: false }] },
            },
          },
        ],
      });

      return {
        ...webpackConfig,
        resolve: {
          ...webpackConfig.resolve,
          // symlinks: false,
          modules: [
            path.resolve('./node_modules'),
            'node_modules',
            path.resolve('./'),
          ],
        },
      };
    },
    eslint: {
      // We run eslint separately in CI
      ignoreDuringBuilds: true,
    },
    experimental: {
      modularizeImports: {
        '@mui/material': {
          transform: '@mui/material/{{member}}',
        },
        lodash: {
          transform: 'lodash/{{member}}',
        },
        // '@tymlez/frontend-libs': {
        //   transform: '@tymlez/frontend-libs/dist/{{member}}',
        // },
        '@mui/icons-material/?(((\\w*)?/?)*)': {
          transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}',
        },
      },
    },
  }),
);
