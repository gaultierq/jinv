module.exports = {
    target: "node",
    entry: './server.js',
    output: {
        path: __dirname + '/bin',
        filename: 'server.bundle.js'
    }
};