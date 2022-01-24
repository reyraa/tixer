const {
  ProvidePlugin,
  EnvironmentPlugin,
  ContextReplacementPlugin,
} = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')

const config = {
  mode: 'production',
  entry: {
    app: `${path.resolve(__dirname, './src/index.tsx')}`,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[name].[contenthash].js',
    publicPath: '/',
  },
  resolve: {
    fallback: {
      net: false,
      fs: false,
      os: false,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: {
    bufferutil: 'bufferutil',
    'utf-8-validate': 'utf-8-validate',
  },
  optimization: {
    // moduleIds: 'named',
    // minimizer: [new TerserPlugin({ test: /\.js(\?.*)?$/i })],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        resolve: {
          extensions: ['.tsx', '.ts', '.js'],
        },

        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
                targets: {
                  browsers: ['last 2 versions', 'safari >= 7'],
                },
              },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          plugins: [
            'syntax-trailing-function-commas',
            'import-glob',
            [
              '@babel/plugin-transform-runtime',
              {
                helpers: false,
                regenerator: true,
              },
            ],
          ],
          env: {
            test: {
              plugins: ['istanbul'],
            },
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        exclude: [/images/],
        options: {
          name: '[path][name]-[hash:6].[ext]',
        },
        loader: 'file-loader',
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
            options: { injectType: 'singletonStyleTag' },
          },
          'css-loader',
        ],
      },
      // {
      //   test: /\.svg$/i,
      //   use: [
      //     {
      //       loader: 'svg-url-loader',
      //       options: {
      //         limit: 10000,
      //         join: (uri, base) => path.join('../..', base, uri),
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|otf|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              join: (uri, base) => path.join('../..', base, uri),

              name: 'assets/img/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer'],
    }),
    new EnvironmentPlugin({
      NACL_FAST: 'disable',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: false,
      templateParameters: {
        // style: 'styles.[contenthash].css',
        vendor: 'bundle.vendor.[contenthash].js',
        app: 'bundle.app.[contenthash].js',
      },
    }),
    // new ContextReplacementPlugin(/bip39[\/\\]wordlists$/, /english/),
    new BundleAnalyzerPlugin(),
  ],
}

module.exports = config
