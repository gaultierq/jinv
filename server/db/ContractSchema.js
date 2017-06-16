import mong from "mongoose";
import {Schema} from "mongoose"

const contractSch = mong.Schema({
    abi: Schema.Types.Mixed,
    binary: String
});

const ContractModel = mong.model('Contract', contractSch);

export default ContractModel;