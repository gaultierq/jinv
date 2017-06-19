import mong from "mongoose";
import {Schema} from "mongoose"

export const ContractSchema = mong.Schema({
    abi: Schema.Types.Mixed,
    binary: String,
    address: String,
    creationTxHash: String
});

const ContractModel = mong.model('Contract', ContractSchema);

export default ContractModel;