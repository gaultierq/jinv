/* eslint-disable no-console */
const path = require('path');
const config = require("../webpack.config");


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

//--> api
app.get('/api/projects', (req, res) => {
    const fixtures = [
        {title: "Some Article", desc: "Super cool article on mexico"},
        {title: "Some Article 2", desc: "Super cool article on mexico 2"},
        {title: "Some Article 3", desc: "Super cool article on mexico 3"}
    ];

    res.json(fixtures);
});
//<-- api
app.get('/', function (req, res) {
    console.log(`request=${req}`);

    const index = path.join(__dirname, 'dist/index.html');
    res.write(middleware.fileSystem.readFileSync(index));
    res.end();
});

const port = 3000;
app.listen(port, function () {
    // eslint-disable-next-line no-console

    console.log('==> 🌎  App running : http://localhost:' + port);
});