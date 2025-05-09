import { Bank } from "../models/response";
import { bankService } from "../service/ApiServiceFactory";

const addBank = async(endpoint: string, bank: Bank)=>{
    return await bankService.create(endpoint,bank);
};

const editBank = async(endpoint: string, id: string, bank: Bank)=>{
    return await bankService.update(endpoint, id, bank);
};

export {addBank,editBank}