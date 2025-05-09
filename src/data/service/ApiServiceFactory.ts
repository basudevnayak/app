import { BaseApiService } from "./BaseApiService";
import { User } from "../models/User";
import exp from "constants";
import { Settings } from "react-native";
import { Bank } from "../models/Bank";
import { Branch } from "../models/Branch";
import { Device } from "../models/Device";
import { Product } from "../models/Product";
import { Feature } from "../models/Feature";
import { DashboardCountResponse } from "../models/response";

export class ApiServiceFactory {
  static createService<T>(endpoint:string): BaseApiService<T> {
    return new BaseApiService<T>(endpoint);
  }
}

export const userService = ApiServiceFactory.createService<User>('/users');
export const bankService = ApiServiceFactory.createService<Bank>('/banks');
export const deviceService = ApiServiceFactory.createService<Device>('/devices');
export const branchService = ApiServiceFactory.createService<Branch>('/branches');
export const dashBoardService = ApiServiceFactory.createService<DashboardCountResponse>('/stats')
export const settingsService = ApiServiceFactory.createService<Settings>('/settings');
export const productService = ApiServiceFactory.createService<Product>('/product');
export const featureService = ApiServiceFactory.createService<Feature>('/features')



