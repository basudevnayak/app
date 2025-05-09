import { Branch } from "../models/response";
import { branchService } from "../service/ApiServiceFactory";
import { BaseApiService } from "../service/BaseApiService";
import { BaseHelper } from "./BaseHelper";

export class BranchHelper extends BaseHelper<Branch> {

  
    constructor(service:BaseApiService<Branch>)
    {
      super(service);
    }
    add(endpoint: string, data: Branch): Promise<Branch> {
      
      return super.add(endpoint,data);
    }
    edit(endpoint: string, id: string, data: Branch): Promise<Branch> {
      return super.edit(endpoint,id,data)
    }
 

}


  

