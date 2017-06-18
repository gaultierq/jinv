import mong from "mongoose";
import {Schema} from "mongoose"
import Contract from "./ContractSchema"

const tokenSch = mong.Schema({
    contract: Contract
});

const TokenModel = mong.model('Token', tokenSch);

export default TokenModel;