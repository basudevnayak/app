import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { SignUp, UpdateProfile } from '../models/SignUp';

export const SignUpApiHelper = {
  signup: async (signupData: SignUp): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}/users/signup`, signupData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Signup failed.');
    }
  },

  updateProfile: async (uuid: string, profileData: UpdateProfile): Promise<any> => {
    try {
      const response = await axios.put(`${BASE_URL}/users/${uuid}`, profileData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Profile update failed.');
    }
  },
};
