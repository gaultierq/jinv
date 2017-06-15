/* eslint-disable no-console */

import Project from './db/ProjectSchema';
import mongoose from "mongoose";

const path = require('path');
const config = require("../webpack.config");


const express = require('express');
const app = express();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

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
// connect database
mongoose.connect('mongodb://localhost/jinv', (err) => {
    if(err) console.log(err);
    else console.log('Connected to database');
});


app.get('/api/projects', (req, res) => {
    // const fixtures = [
    //     {title: "Some Article", desc: "Super cool article on mexico"},
    //     {title: "Some Article 2", desc: "Another cool article on mexico 2"},
    //     {title: "Some Article 3", desc: "Super cool article on mexico 3"}
    // ];

    Project.find({}, (err, projects) => {
        res.json(projects)
        //res.json(fixtures)
    });
});


app.post('/api/project', (req, res) => {
    const body = req.body;
    console.log(`saving proj ${body}`);

    let proj = new Project(body);

    proj.save().then((p) => {
        console.log(`project saved ${p}`);
        return res.json(p.toObject());
    })
});

//<-- api
app.get('/',  (req, res) => {
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