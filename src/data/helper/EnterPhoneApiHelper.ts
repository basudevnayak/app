import { ApiServiceFactory } from "../service/ApiServiceFactory";
import { EnterPhone } from "../models/EnterPhone";

export const sendPhoneNumber = async (phone: string): Promise<EnterPhone> => {
  try {
    const apiService = ApiServiceFactory.createService<EnterPhone>();
    const requestData: EnterPhone = {
     
      phone: phone,
     
    };
    
    const response = await apiService.create<EnterPhone>("users/send-otp", requestData);
    return response;
  } catch (error: any) {
    throw new Error(error.message || "Failed to send OTP");
  }
};
