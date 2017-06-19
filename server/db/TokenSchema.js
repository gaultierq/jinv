import mong from "mongoose";
import {ContractSchema} from "./ContractSchema"

export const TokenSchema = mong.Schema({
    contract: ContractSchema
});

const TokenModel = mong.model('Token', TokenSchema);

export default TokenModel;