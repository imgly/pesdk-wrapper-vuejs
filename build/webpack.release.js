const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const cssLoader = ExtractTextPlugin.extract('style-loader', 'css-loader')
const npmCfg = require('../package.json')
const vueLoaderConfig = require('./vue-loader.conf')


function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    'vue-pesdk': './src/index.js'
  },
  devtool: 'source-map',
  output: {
    filename: './dist/[name].js',
    library: 'VuePsdk',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'photoeditorsdk': 'PhotoEditorSDK',
    'photoeditorsdk/desktop-ui': 'photoeditorsdk/desktop-ui',
    'photoeditorsdk/react-ui': 'photoeditorsdk/react-ui',
    'vue': 'Vue'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.css$/,
        loader: cssLoader
      },
      {
        test: /\.s[a|c]ss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}

if (process.env.NODE_ENV === 'production') {
  // delete module.exports.devtool
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ]
}
