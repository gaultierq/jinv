var path = require('path');

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.join(__dirname, "client"),
    entry:   [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
        './client.js'
    ]

    , module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                    "eslint-loader",
                ]
            },
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            }
            // , {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: ['babel-loader', 'eslint-loader']
            // }
        ]
    }
    , output: {
        path: __dirname + "/bin/",
        filename: "client.bundle.js"
    }
    , plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(), //needed for hot replacement
        new HtmlWebpackPlugin({template: 'index.html'})]
};