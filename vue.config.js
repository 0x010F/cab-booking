const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MinifyPlugin = require('babel-minify-webpack-plugin')

const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {

  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      const opt = {
      // （Default 5) Maximum concurrent requests when loading on demand
        maxAsyncRequests: 16,
        // (default 3) maximum number of concurrent requests on the entry point
        maxInitialRequests: 16,
        // (Default: 1) The minimum number of blocks of the shared module before splitting
        minChunks: 2,
        // (default: 30000) the minimum size of the block
        minSize: 130000,
        // Webpack will use the origin and name of the block to generate the name: `vendors~main.js`, if the item conflicts with "~", it can be modified by this value, Eg: '-'
        automaticNameDelimiter: '~',
        // cacheGroups is an object where keys are the cache group names.
        name: true,
        cacheGroups: {
          default: false,
          // common: {
          //   name: `chunk-common`,
          //   minChunks: 4,
          //   priority: -20,
          //   chunks: 'initial',
          //   reuseExistingChunk: true
          // },
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            // The default group has a lower priority to allow any custom cache group to have a higher priority (default is 0)
            priority: -30
          }
        }
      }
      config.optimization.splitChunks = { ...config.optimization.splitChunks, ...opt }

      const plugins = []
      if (process.env.NODE_ENV === 'production') {
        plugins.push(new webpack.AutomaticPrefetchPlugin())
        plugins.push(new MinifyPlugin({}, {

          test: /\.js(\?.*)?$/i

        }))

        // plugins.push(
        //   new MiniCssExtractPlugin({
        //     // Options similar to the same options in webpackOptions.output
        //     // both options are optional
        //     filename: '[name].css',
        //     chunkFilename: '[id].css',
        //   })
        // );

        plugins.push(new TerserPlugin({
        // sourceMap: true,
          extractComments: 'all',
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {},
            mangle: true, // Note `mangle.properties` is `false` by default.
            module: false,
            output: {
              comments: false
            },
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_classnames: undefined,
            keep_fnames: false,
            safari10: false
          },
          parallel: true,
          test: /\.js(\?.*)?$/i
        })
        )

        plugins.push(new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 4
        }))

        plugins.push(
          new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            threshold: 5000,
            minRatio: 0.8
          }))

        config.plugins = [...config.plugins, ...plugins]

        // console.log( config.module.rules)
        // const rule1 = {rules: [
        //   {
        //     test: /\.css$/,
        //     use: [MiniCssExtractPlugin.loader, 'css-loader'],
        //   },
        // ]};

        // for (let i = 0; i <  config.module.rules.length; i++) {
        //   if(String(config.module.rules[i].test) == String(/\.css$/) ) {
        //     config.module.rules[i].use = [MiniCssExtractPlugin.loader, 'css-loader'];
        //     break;
        //   }
        // }

        // console.log(config.module.rules)
        // config.module.rules.push(rule1);
      } else {
      // mutate for development...
      }
    }
  },
  pwa: {
    name: 'MKCL',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    // workboxPluginMode: 'GenerateSW',
    workboxPluginMode: 'InjectManifest',
    offlineGoogleAnalytics: true,
    cleanupOutdatedCaches: true,

    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      // swSrc: 'src/registerServiceWorker.js',
      swSrc: 'public/sw.js',
      // swDest: './public/service-worker.js',
      exclude: [/\.LICENSE$/],
      include: [/\.html$/, /\.js$/, /\.css$/]
      // ...other Workbox options...
    },
    runtimeCaching: [
      {
        // Match any same-origin request that contains 'server'.
        urlPattern: /server/,
        // Apply a network-Only strategy.
        handler: 'NetworkOnly'

      },
      {
        // Match any same-origin request that contains 'api'.
        urlPattern: /(.html)|(.png)|(.js)|(.css)|(.woff2)|(.ico)|(.jpg)/,
        // Apply a network-first strategy.
        handler: 'CacheFirst',
        options: {
          // Fall back to the cache after 10 seconds.
          // networkTimeoutSeconds: 10,
          // Use a custom cache name for this route.
          cacheName: 'ImgCache',
          // Configure custom cache expiration.
          expiration: {
            maxEntries: 1000,
            maxAgeSeconds: 60 * 60 * 60 * 24 // one day
          },
          // Configure background sync.
          backgroundSync: {
            name: 'ImgCacheQue',
            options: {
              maxRetentionTime: 60 * 60
            }
          },
          fetchOptions: {
            mode: 'no-cors'
          }

        }
      }
      //  {
      //   // To match cross-origin requests, use a RegExp that matches
      //   // the start of the origin:
      //   urlPattern: new RegExp('^/'),
      //   handler: 'StaleWhileRevalidate',
      //   options: {
      //     cacheableResponse: {
      //       statuses: [0, 200]
      //     }
      //   }
      // }
    ]
  },
  devServer: {
    proxy: {
      '/server': {
        target: 'http://localhost:8080', // provide proxy  for your project
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/server': ''
        }
      },
      '/cdnserver': {
        target: 'http://localhost:3034/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/cdnserver': ''
        }
      }
    }
  },
  productionSourceMap: false
}
