import AsyncStorageHelper from "../../utils/data/local/AsyncStorageHelper";
import { Command } from "../models/Command";
import { ApiResponse } from "../models/response";
import { BaseApiService } from "./BaseApiService";

class CommandService extends BaseApiService<Command>
{
  
   public getAllCommands=async ():Promise<ApiResponse<Command[]>>=>{

    const token = await AsyncStorageHelper.getItem('token');
    const response = await this.apiClient.get(`/commands`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
    
  }

  public add=async (command:Command):Promise<ApiResponse<Command>>=>{
    const token = await AsyncStorageHelper.getItem('token');
    const  response= await super.create<ApiResponse<Command>>("/commands",command);
    return response;
    
  }

  public deleteCommand= async (commandId:string):Promise<void>=>{
    const token = await AsyncStorageHelper.getItem('token');
    const  response= await super.delete("/commands",commandId);
    return response;
    
  }
  public updateCommands=async (command:Command):Promise<ApiResponse<Command>>=>{
    const token = await AsyncStorageHelper.getItem('token');
    const  response= await super.create<ApiResponse<Command>>("/commands",command);
    return response;
  }
}


export default CommandService;
