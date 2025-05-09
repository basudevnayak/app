import { Base } from "./Base";

export interface Feature extends Base{
    description: string;
    createdAt?: string;
    input:boolean
    updatedAt?: string;
    __v?: number;
    dUuid?: string;
    productUuid?: string;
  }
  
export const emptyfeature:Feature ={
  name: "",
  description: "",
  input:false
}