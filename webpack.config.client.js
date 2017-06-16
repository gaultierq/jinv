const webpack = require("webpack");
const path = require("path");

module.exports = {
    devtool: "inline-source-map",
    entry: [
        "react-hot-loader/patch",
        "webpack-dev-server/client?http://localhost:3001",
        "webpack/hot/only-dev-server",
        "./client/client",
    ],
    target: "web",
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: "babel-loader",
                include: [
                    path.join(__dirname, "client"),
                    path.join(__dirname, "common"),
                ],
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
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": { BUILD_TARGET: JSON.stringify("client") },
        }),
    ],
    devServer: {
        host: "localhost",
        port: 3001,
        historyApiFallback: true,
        hot: true,
        headers: { "Access-Control-Allow-Origin": "*" }
    },
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "http://localhost:3001/",
        filename: "client.bundle.js",
    },
};
