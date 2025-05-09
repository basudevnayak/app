
import { Settings } from "../models/response";
import { settingsService } from "../service/ApiServiceFactory";
import { BaseApiService } from "../service/BaseApiService";
import { BaseHelper } from "./BaseHelper";

export class SettingsHelper extends BaseHelper<Settings> {

  
    constructor(service:BaseApiService<Settings>)
    {
      super(service);
    }
    add(endpoint: string, data: Settings): Promise<Settings> {
      
      return super.add(endpoint,data);
    }
    edit(endpoint: string, id: string, data: Settings): Promise<Settings> {
      return super.edit(endpoint,id,data)
    }
 

}


  

