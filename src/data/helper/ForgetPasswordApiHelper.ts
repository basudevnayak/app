// src/data/helper/ForgetPasswordApiHelper.ts

import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

export interface ForgetPasswordRequest {
  identifier: string;
  password: string;
}

export const forgetPasswordApiHelper = async (data: ForgetPasswordRequest) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/reset-password`, data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('API Error:', error.response.data);
      throw new Error(error.response.data.message || 'Something went wrong.');
    } else {
      console.error('Error:', error.message);
      throw new Error('Network error occurred.');
    }
  }
};

export default forgetPasswordApiHelper;
