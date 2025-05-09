import { Base } from "./Base"

export interface Product extends Base{
  
   
    description:string,
    status?: string,
    deviceModel: string,
    company:string,
    image: string,
   
  
}
export const emptyProduct:Product ={
    name:"",
    deviceModel:"",
    company:"",
    description:"",
    image:""
}