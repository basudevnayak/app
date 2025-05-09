import { Base } from "./Base"
export interface Device extends Base 
{
  description:string,
  bankUuid: string,
  branchUuid: string,
  productUuid:string,
  simNumber: string,
  uuid:string
}
export interface DeviceForm {
  bankId: string;
  branchName: string;
  productId: string;
  name: string;
  description?: string;
  simNumber: string;
}




