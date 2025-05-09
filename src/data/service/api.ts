import axios from 'axios';

const BASE_URL = 'YOUR_BACKEND_API_URL'; // Replace with your actual backend URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export const apiService = {
  // Example GET request
  getData: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    try {
      const response = await api.get(endpoint);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw error;
    }
  },

  // Example POST request
  postData: async <T>(endpoint: string, data: any): Promise<ApiResponse<T>> => {
    try {
      const response = await api.post(endpoint, data);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw error;
    }
  },
}; 