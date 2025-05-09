import axios, { AxiosError } from 'axios';
import { TermsAndConditions } from '../models/TermAndConditions';
import { BASE_URL } from '../../utils/constants';
import { Logger } from '../../utils/logger';

const apiUrl = `${BASE_URL}/content/terms-and-conditions`;

interface TermsResponse {
  content?: string[];
  terms?: string;
  status?: string;
  message?: string;
  data?: string;
}

export const fetchTermsAndConditions = async (): Promise<TermsAndConditions> => {
  try {
    Logger.log('Fetching terms and conditions from:', apiUrl);
    
    const response = await axios.get<TermsResponse>(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 5000 // 5 second timeout
    });
    
    Logger.log('Terms and conditions response:', response.data);
    
    if (!response.data) {
      throw new Error('Empty response from server');
    }

    // Handle different possible response formats
    let content: string[] = [];
    
    if (Array.isArray(response.data.content)) {
      content = response.data.content;
    } else if (typeof response.data.terms === 'string') {
      content = response.data.terms.split('\n').filter(line => line.trim());
    } else if (typeof response.data.data === 'string') {
      content = response.data.data.split('\n').filter(line => line.trim());
    }

    if (content.length === 0) {
      throw new Error('No terms and conditions content found in the response');
    }

    return {
      content,
      status: response.data.status || 'success',
      message: response.data.message
    };
  } catch (error) {
    console.error('Error fetching terms and conditions:', error);
    
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || error.message;
      const statusCode = error.response?.status;
      
      console.error('Axios error details:', {
        message: errorMessage,
        status: statusCode,
        data: error.response?.data
      });

      if (statusCode === 404) {
        throw new Error('Terms and conditions endpoint not found. Please check the API URL.');
      } else if (statusCode === 401 || statusCode === 403) {
        throw new Error('Authentication required to fetch terms and conditions.');
      } else {
        throw new Error(`Failed to fetch terms and conditions: ${errorMessage}`);
      }
    }
    
    throw new Error('An unexpected error occurred while fetching terms and conditions');
  }
};