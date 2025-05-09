import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../../utils/constants';
import { PrivacyPolicyResponse } from '../models/PrivacyPolicy';
import { Logger } from '../../utils/logger';

const apiUrl = `${BASE_URL}/content/privacy-policy`;

export const fetchPrivacyPolicy = async (): Promise<PrivacyPolicyResponse> => {
  try {
    Logger.log('Fetching privacy policy from:', apiUrl);
    
    const response = await axios.get<PrivacyPolicyResponse>(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    Logger.log('Privacy Policy response:', response.data);
    
    if (!response.data) {
      throw new Error('Empty response from server');
    }

    return response.data;
  } catch (error) {
    console.error('Error details:', error);
    if (error instanceof AxiosError) {
      console.error('Axios error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      throw new Error(`Failed to fetch privacy policy: ${error.message}`);
    }
    throw error;
  }
};