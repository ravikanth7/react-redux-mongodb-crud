var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var cssnext = require('postcss-cssnext');
var postcssFocus = require('postcss-focus');
var postcssReporter = require('postcss-reporter');
var cssnano = require('cssnano');

var cssloaders = [
  { loader: 'css-loader', 
    options: { localIdentName: '[local]', 
      modules: true, 
      importLoaders: 1, 
      sourceMap: true
    }
  },
  { loader: 'postcss-loader' }
]

module.exports = {
  devtool: 'hidden-source-map',

  entry: {
    app: [
      'babel-polyfill',
      './client/index.js',
    ],
    vendor: [
      'react',
      'react-dom',
      'immutable',
      'prop-types'
    ]
  },

  output: {
    path: __dirname + '/dist/',
    filename: '[name]-bundle.js',
    chunkFilename: '[name]-chunk.js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'client',
      'node_modules',
    ],
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: cssloaders
        })
      }, {
        test: /\.css$/,
        include: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader'],
        })  
      }, {
        test: /\.jsx*$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }, {
        test: /\.(jpe?g|gif|png|svg)$/i,
        use: 'url-loader?limit=10000',
      }, {
        test: /\.json$/,
        use: 'json-loader',
      },
      { 
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "url-loader?limit=10000&mimetype=application/font-woff" 
      },
      { 
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "file-loader" 
      },      
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        context  : __dirname,
        postcss: [
          postcssFocus(),
          cssnext({ browsers: ['last 2 versions', 'IE > 10'], }),
          cssnano({ autoprefixer: false }),
          postcssReporter({ clearMessages: true, })
        ]
      }
    }),    
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js',
    }),
    new ExtractTextPlugin({ filename: 'app.[chunkhash].css', disable: false, allChunks: true }),
    new ManifestPlugin({
      basePath: '/',
    }),
    new ChunkManifestPlugin({
      filename: "chunk-manifest.json",
      manifestVariable: "webpackManifest",
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      }
    }),    
  ],
};
