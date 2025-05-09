import axios from 'axios';
import { User } from '../models/User';
import { UserListDetails } from '../models/response';

const BASE_URL = 'http://techlambda.com:7500';

export const getAllUsers = async (): Promise<User[]> => {
  const response = await axios.get<UserListDetails<User[]>>(`${BASE_URL}/users`);
  return response.data.data;
};
