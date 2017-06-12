var path = require('path');

module.exports = {
    context: path.join(__dirname, "src"),
    entry: './client.js'
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
};