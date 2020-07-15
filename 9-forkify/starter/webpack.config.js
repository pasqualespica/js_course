const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: ["babel-polyfill", './src/js/index.js'],
    output: {
        // path: path.resolve(__dirname, "dist/js"),
        path: path.resolve(__dirname, "dist"),
        filename: 'js/bundle.js'
    },
    // mode: 'development'
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({ // copy index.html from SRC to DIST
            filename: "index.html",
            template: "./src/index.html"
        })
    ],
    // Used by Babel
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }

}