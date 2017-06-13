/* eslint-disable no-console */
const path = require('path');
const config = require("./webpack.config");


const express = require('express');
const app = express();


const compiler = require("webpack")(config);

// --> getting rid of webpack-dev-server
const middleware = require("webpack-dev-middleware")(compiler, {
    noInfo: false,
    publicPath: "/",
    stats: {colors: true}
});
app.use(middleware);

app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log
}));
// <-- getting rid of webpack-dev-server

app.get('/', function (req, res) {
    console.log(`request=${req}`);

    const index = path.join(__dirname, 'bin/index.html');
    res.write(middleware.fileSystem.readFileSync(index));
    res.end();
});

app.listen(3000, function () {
    // eslint-disable-next-line no-console
    console.log('==> 🌎  App running : http://localhost:3000');
});