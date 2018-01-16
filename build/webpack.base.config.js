const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  entry: {
    main: '@/main',
    'vender-base': '@/vendors/vendors.base.js',
    'vender-exten': '@/vendors/vendors.exten.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist/dist')
  },
  module: {
    rules: [{
        test: /.vue$/,
        use: [{
            loader: 'vue-loader',
            options: {
              // loaders: {
              //   less: ExtractTextPlugin.extract({
              //     use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
              //     fallback: 'vue-style-loader'
              //   }),
              //   css: ExtractTextPlugin.extract({
              //     use: ['css-loader', 'autoprefixer-loader', 'less-loader'],
              //     fallback: 'vue-style-loader'
              //   })
              // }
              loaders: {
                css: 'vue-style-loader!css-loader',
                less: 'vue-style-loader!css-loader!less-loader'
              },
              postLoaders: {
                html: 'babel-loader'
              }
            }
          },
          {
            loader: 'iview-loader',
            options: {
              prefix: false
            }
          }
        ]
      },
      {
        test: /iview\/.*?js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader?minimize', 'autoprefixer-loader'],
          fallback: 'style-loader'
        })
      },

      {
        test: /\.less/,
        use: ExtractTextPlugin.extract({
          use: ['autoprefixer-loader', 'less-loader'],
          fallback: 'style-loader'
        })
      },

      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=1024'
      },
      {
        test: /\.(html|tpl)$/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      '@': resolve('../src'),
    }
  }
};
