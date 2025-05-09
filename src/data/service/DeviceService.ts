import { ApiResponse } from "./api";
import { BaseApiService } from "./BaseApiService";
import AsyncStorageHelper from "../../utils/data/local/AsyncStorageHelper";
import { Device } from "../models/Device";

 class DeviceService extends BaseApiService<ApiResponse<Device>>
{
    public  getAllDevices = async (): Promise<ApiResponse<Device[]>> =>{
    const token = await AsyncStorageHelper.getItem('token');
    const response = await this.apiClient.get("/devices", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
}
    
 public add=async (device:Device):Promise<ApiResponse<Device>>=>{
    const token = await AsyncStorageHelper.getItem('token');
    const  response= await super.create<ApiResponse<Device>>("/devices",device);
    return response;
    
  }

  public deleteProduct= async (deviceId:string):Promise<void>=>{
    const token = await AsyncStorageHelper.getItem('token');
    const  response= await super.delete("/devices",deviceId);
    return response;
    
  }
  public updatProduct=async (device:Device):Promise<ApiResponse<Device>>=>{
    const token = await AsyncStorageHelper.getItem('token');
    const  response= await super.create<ApiResponse<Device>>("/devices",device);
    return response;
  }
}


export default DeviceService;
