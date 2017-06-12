var path = require('path');

module.exports = {
    context: path.join(__dirname, "src"),
    entry: './client.js',
    output: {
        path: __dirname + "/bin/",
        filename: "client.bundle.js"
    }
};