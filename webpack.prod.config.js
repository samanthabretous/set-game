const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './client/view/Entry.jsx',
  ],
  output: {
    path: path.join(__dirname, '/client/public/bundle'),
    filename: 'bundle.js',
    publicPath: '/client/public/bundle',
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules|app-server.js)/,
        loaders: [
          'babel?presets[]=react,presets[]=es2015'],
      },
      {
        test: /\inline.svg$/,
        loader: 'babel?presets[]=es2015,presets[]=react!svg-react',
      },
      {
        test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
        loader: 'url',
      },
      {
        test: /\.(ico|jpg|png|gif|otf|webp|woff|)(\?.*)?$/,
        loaders: ['url-loader', 'file-loader'],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|^(?!.*\.inline\.svg$).*\.svg$/,
        loader: 'url-loader',
      },
    ],
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
  ]
};
