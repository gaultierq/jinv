var path = require('path');

module.exports = {
    context: path.join(__dirname, "src"),
    entry: './client.js'
    , module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
                , query: {
                presets: ['react'],
                plugins: ['react-html-attrs']
            }
                // , query: {
                //     presets: ['react', 'es2015', 'stage-0'],
                //     plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
                // }
            }
        ]
    }
    , output: {
        path: __dirname + "/bin/",
        filename: "client.bundle.js"
    }
};