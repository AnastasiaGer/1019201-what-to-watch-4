const path = require(`path`);

module.exports = {
  entry: `./src/index.tsx`,
  resolve: {
    extensions: [`.ts`, `.tsx`, `.js`, `json`]
  },
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    open: true,
    inline: true,
    port: 1333,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      }, {
        test: /\.(tsx|ts)?$/,
        loader: `ts-loader`}
    ],
  },
  devtool: `source-map`,
};
