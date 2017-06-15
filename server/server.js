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
mongoose.connect('mongodb://localhost/jinv', (err, d) => {
    if(err) console.log(err);
    else {
        console.log(`Connected to database`);
    }

});


app.get('/api/projects', (req, res) => {
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

app.delete('/api/project', (req, res) => {
    const body = req.query;
    console.log(`deleting proj ${JSON.stringify(body)}`);

    Project
        .findByIdAndRemove(body)
        .exec()
        .then((p) => {
            console.log(`project removed ${p}`);
            return res.json(p ? p.toObject() : {} );
        }
    ).then(null, (err) => {
        console.log(`error while removing the project ${err}`);
        return res.sendStatus(500).end();
    });
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