var webpack = require('webpack');
var cssnext = require('postcss-cssnext');
var postcssFocus = require('postcss-focus');
var postcssReporter = require('postcss-reporter');

var cssModulesIdentName = '[local]';
if (process.env.NODE_ENV === 'production') {
  cssModulesIdentName = '[local]';
}

var cssloaders = [
  'style-loader',
  { loader: 'css-loader', 
    options: { localIdentName: cssModulesIdentName, 
      modules: true, 
      importLoaders: 1, 
      sourceMap: true
    }
  },
  { loader: 'postcss-loader' }
]

module.exports = {
  output: {
    publicPath: '/',
    libraryTarget: 'commonjs2',
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
        use: cssloaders,
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
        use: 'url-loader?limit=10000',
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
    new webpack.LoaderOptionsPlugin({
      options: {
        context  : __dirname,        
        postcss: () => [
          postcssFocus(),
          cssnext({ browsers: ['last 2 versions', 'IE > 10'], }),
          postcssReporter({ clearMessages: true, })
        ]
      }
    })
  ]
};
