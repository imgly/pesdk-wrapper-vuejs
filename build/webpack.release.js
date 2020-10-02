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
    'vue-pesdk': './src/components/PhotoEditor.vue'
  },
  devtool: 'source-map',
  output: {
    filename: './dist/[name].js',
    library: 'PhotoEditor',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    'vue': {
      root: 'Vue',
      commonjs2: 'vue',
      commonjs: 'vue',
      amd: 'vue',
      umd: 'vue',
    },
    photoeditorsdk: {
      root: 'PhotoEditorSDK',
      commonjs2: 'photoeditorsdk',
      commonjs: 'photoeditorsdk',
      amd: 'photoeditorsdk',
      umd: 'photoeditorsdk',
    },
    'photoeditorsdk/desktop-ui': {
      root: 'PhotoEditorDesktopUI',
      commonjs2: 'photoeditorsdk/desktop-ui',
      commonjs: 'photoeditorsdk/desktop-ui',
      amd: 'photoeditorsdk/desktop-ui',
      umd: 'photoeditorsdk/desktop-ui',
    },
    'photoeditorsdk/react-ui': {
      root: 'PhotoEditorDesktopUI',
      commonjs2: 'photoeditorsdk/react-ui',
      commonjs: 'photoeditorsdk/react-ui',
      amd: 'photoeditorsdk/react-ui',
      umd: 'photoeditorsdk/react-ui',
    },
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom',
    },
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
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', { modules: false }]
            ],
            'plugins': ['transform-runtime', 'transform-es2015-modules-commonjs'],
          }
        }],
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
