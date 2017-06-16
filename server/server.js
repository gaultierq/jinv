import mongoose from "mongoose";
import express from "express";
import fs from 'fs';
import path from 'path';
import bodyParser from "body-parser";
import solc from "solc";
import Project from './db/ProjectSchema';
import Contract from './db/ContractSchema';

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
    res.send("ok");
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



app.post('/api/submitContract', (req, res) => {

    const contractName = "SimpleStorage";
    let contractSource = fs
        .readFileSync(path.join(process.cwd(), "contracts/" + contractName+'.sol'))
        .toString().replace(/\n/g,' ');
    console.log(`contract source=${contractSource} `);

    let compiled = solc.compile(contractSource, 0);
    console.log(`contract compiled=${JSON.stringify(compiled)} `);

    const c = ":" + contractName;
    if(!compiled.contracts[c]) {
        console.log('Contract must have same name as file!');
        throw new Error("Contract must have same name as file!");
    }

    let bytecode = compiled.contracts[c].bytecode;
    let interfac = compiled.contracts[c].interface;

    let contract_data = {
        abi: JSON.parse(interfac),
        binary: bytecode
    };

    let contract = new Contract(contract_data);

    contract.save().then((p) => {
        console.log(`contract saved: ${p}`);
        return res.json(p.toObject()._id);
    })
});

//<-- api

app.get('/',  (req, res) => {
    console.log(`request:home`);
    const index = path.join(process.cwd(), 'dist/index.html');
    res.write(fs.readFileSync(index));
    res.end();
});


export default app;