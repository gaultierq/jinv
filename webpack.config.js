var path = require('path');

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.join(__dirname, "client"),
    entry:   [
        // 'webpack/hot/dev-server', probably only for webpack-dev-server
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
            {
                test: /(\.scss|\.css)$/,
                loaders: [
                    require.resolve('style-loader'),
                    require.resolve('css-loader') + '?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                    require.resolve('sass-loader') + '?sourceMap'
                ]
            }
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
        path: __dirname + "/dist/",
        filename: "client.bundle.js"
    }
    , plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(), //needed for hot replacement
        new HtmlWebpackPlugin({template: 'index.html'})]
};