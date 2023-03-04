const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/app.js',  //входной файл нашего приложения
  output: {
    filename: 'bundle. [chunkhash] .js', //файл, в который всё будет собираться
    path: path.resolve(__dirname, 'public') //путь к папке
  },
  devServer: {
    port: 3000  //на данном порте мы будем сёрвить наше приложение
  }, 
  plugins: [
    new HTMLPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
}