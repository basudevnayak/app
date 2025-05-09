import axios from "axios";
import { User } from "../models/User";
import { userService } from "../service/ApiServiceFactory";
import { ApiResponse } from "../models/response";
import { BASE_URL } from "../../utils/constants";


// Sign Up function
const signUp = async (user: User) => {
  return await userService.create(user);
};

// Login function supporting both email and phone
/* const login = async (endpoint: string, loginDto: { identifier: string, password: string }) => {
  // Check if identifier is an email or phone
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginDto.identifier);

  // Construct the dynamic DTO
  const loginPayload = {
    password: loginDto.password,
    ...(isEmail ? { email: loginDto.identifier } : { phone: loginDto.identifier }),
  };

  return await userService.create(endpoint, loginPayload);
}; */


const login = async (loginDto: { email: string, password: string ,signupType:string}| { phone: string, password: string ,signupType:string}): Promise<any> => {

  try {
    const response = await axios.post<ApiResponse<User>>(`${BASE_URL}/users/login`, loginDto);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};



export { signUp, login };
