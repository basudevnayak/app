import { ReactNode } from "react";
import { Base } from "./Base";

export interface Bank extends Base
{
  code: string,
  postalAddress: string,
  city: string,
  state: string,
  pinCode: string
}


