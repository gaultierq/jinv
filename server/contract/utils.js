/**
 * Created by qg on 17/06/17.
 */
import solc from "solc";
import Contract from '../db/ContractSchema';
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

export function saveContract(res) {
    let contract_data = createContractFromTemplate();

    let contract = new Contract(contract_data);

    contract.save().then((p) => {
        console.log(`contract saved: ${p}`);
        return res.json(p.toObject()._id);
    })
}
