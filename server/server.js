import Project from './db/ProjectSchema';
import mongoose from "mongoose";
import express from "express";
import fs from 'fs';
import path from 'path';
import bodyParser from "body-parser";

console.log('-- CREATING APP --');

const app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

//for hot module. probably there is a better way!
mongoose.disconnect(() => {
        mongoose.connect('mongodb://localhost/jinv', (err) => {
            if(err) console.log(err);
            else {
                console.log(`Connected to database`);
            }
        });
    }
);
//--> api
// connect database


app.get('/api/projects', (req, res) => {
    Project.find({}, (err, projects) => {
        res.json(projects)
        //res.json(fixtures)
    });
});

app.get('/api/test', (req, res) => {
    res.send("oki");
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
    const index = path.join(process.cwd(), 'client/index.html');
    res.write(fs.readFileSync(index));
    res.end();
});


export default app;