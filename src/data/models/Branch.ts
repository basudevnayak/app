import { Bank } from "./Bank";
import { Base } from "./Base";
export interface Branch extends Base
{
  code: string,
  bankUuid: string,
  postalAddress: string,
  city:string,
  state:string,
  pinCode: string,
  phone: string,
}