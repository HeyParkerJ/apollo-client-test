/* eslint-env node */
const path = require('path')
const { readFileSync } = require('fs')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const getEnv = (key, fallback) => {
  const value = process.env[key]
  if (!value) {
    if (fallback) return fallback
    throw new Error(`"process.env.${key}" is not set!`)
  }
  return value
}

const env = getEnv('NODE_ENV', 'production')
const dev = env === 'development'

const root = process.cwd()
const src = path.join(root, 'src')
const build = path.join(root, 'build')
const context = src
const publicPath = '/'

console.log(`NODE_ENV: ${env}`)

const config = {
  context,
  entry: './index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: ['node_modules', '.'], // This is not backwards compatable in Apollo v3
  },
  mode: dev ? 'development' : 'production',
  output: {
    path: build,
    publicPath,
    filename: 'bundle.js',
  },
  module: {
    rules: rules(),
  },
  plugins: plugins(),
  optimization: {
    minimize: !dev,
  },
}

if (dev) {
  console.log('SOURCEMAPPING ON')
  config.devtool = 'source-map'
  if (getEnv('WEBPACK_DEV_SERVER', 'false') !== 'false') {
    config.devServer = {
      host: getEnv('WEBPACK_HOST', 'localhost'),
      port: parseInt(getEnv('WEBPACK_PORT', '8080'), 10),
      disableHostCheck: true,
      historyApiFallback: {
        index: path.join(publicPath, 'index.html'),
      },
    }
  }
}

function rules () {
  return [
    ...typescriptRules(),
  ]
}

function typescriptRules () {
  return [
    {
      test: /\.tsx?$/,
      include: src,
      exclude: /node_modules/,
      use: [
        {
          loader: 'ts-loader',
        },
      ],
    },
    // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
    {
      enforce: 'pre',
      test: /\.js$/,
      loader: 'source-map-loader',
    },
  ]
}

function plugins () {
  return [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ]
}

module.exports = config
