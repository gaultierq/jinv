/**
 * Created by qg on 17/06/17.
 */
import solc from "solc";
import Contract from '../db/ContractSchema';
import Token from '../db/TokenSchema';
import fs from 'fs';
import path from 'path';


let createContractFromTemplate = function () {
    const contractName = "SimpleStorage";
    let contractSource = fs
        .readFileSync(path.join(process.cwd(), "contracts/" + contractName + '.sol'))
        .toString().replace(/\n/g, ' ');
    console.log(`contract source=${contractSource} `);

    let compiled = solc.compile(contractSource, 0);
    console.log(`contract compiled=${JSON.stringify(compiled)} `);

    const c = ":" + contractName;
    if (!compiled.contracts[c]) {
        console.log('Contract must have same name as file!');
        throw new Error("Contract must have same name as file!");
    }

    let bytecode = compiled.contracts[c].bytecode;
    let interfac = compiled.contracts[c].interface;

    return {
        abi: JSON.parse(interfac),
        binary: bytecode
    };
};

export function createToken(project, res) {
    let contract_data = createContractFromTemplate();
    if (!contract_data) {
        res.sendStatus(500);
        return;
    }
    let contract = new Contract(contract_data);

    project.token = new Token({
        contract: contract
    });

    console.log(`saving: ${JSON.stringify(project)}`);

    project
        .save()
        .then((c) => {
            console.log(`project saved: ${c}`);
            res.send(JSON.stringify(c));
            return c;
        })
        .then(null, (err) => res.status(500).send(err));
}

