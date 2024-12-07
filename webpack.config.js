const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const webpack = require('webpack')
const fs = require('fs')

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'
  const isDevelopment = argv.mode === 'development'

  const pages = fs
    .readdirSync(path.resolve(__dirname, 'src/pages'))
    .filter(fileName => fileName.endsWith('.pug'))

  const htmlPlugins = pages.map(page => {
    return new HtmlWebpackPlugin({
      template: `./src/pages/${page}`,
      filename: `${page.replace('.pug', '.html')}`,
      inject: true
    })
  })

  return {
    entry: './src/scripts/index.js',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: isProduction ? './' : '/'
    },
    module: {
      rules: [
        {
          test: /\.pug$/,
          use: ['thread-loader', 'pug-loader']
        },
        {
          test: /\.scss$/,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'resolve-url-loader',
              options: {
                sourceMap: true,
                root: path.resolve(__dirname, 'src/public/images')
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                additionalData: `$publicPath: './public/images/';`
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
          generator: {
            filename: isProduction
              ? './public/images/[name][hash][ext]'
              : 'public/images/[name][hash][ext]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][hash][ext]'
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      ...htmlPlugins,
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: 'src/public', to: 'public' }]
      })
    ],
    devtool: isDevelopment ? 'eval-cheap-module-source-map' : false,
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist')
      },
      compress: true,
      port: 8080,
      open: true,
      hot: true,
      watchFiles: ['src/**/*']
    },
    resolve: {
      alias: {
        images: path.resolve(__dirname, 'src/public/images')
      }
    },
    optimization: {
      minimize: isProduction,
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 10,
        maxAsyncRequests: 10,
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            enforce: true,
            priority: 20
          },
          common: {
            name: 'common',
            chunks: 'all',
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      },
      runtimeChunk: 'single',
      usedExports: true
    }
  }
}
