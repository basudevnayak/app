import axios, { AxiosInstance } from 'axios';
import { Logger } from '../../utils/logger';
import { BASE_URL } from '../../utils/constants';
import { ApiResponse } from '../models/response';
import { showAlert } from '../../utils/alert/Alert';

export class BaseApiService<T> {
  private apiClient: AxiosInstance;
  private endpoint: string;

  constructor(endpoint: string, apiClient?: AxiosInstance) {
    this.endpoint = endpoint;
    this.apiClient = apiClient ?? axios.create({
      baseURL: BASE_URL,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async customGet<R>(subEndpoint: string): Promise<ApiResponse<R>> {
    try {
      Logger.log("GET Request (custom):", `${this.endpoint}/${subEndpoint}`);
      const response = await this.apiClient.get<ApiResponse<R>>(`${this.endpoint}/${subEndpoint}`);
      return response.data;
    } catch (error: any) {
      this.handleError(error, `Failed to fetch from custom endpoint: ${subEndpoint}`);
      throw error?.response?.data || new Error(`Failed to fetch from custom endpoint: ${subEndpoint}`);
    }
  }
  
  async customPost<R>(subEndpoint: string, data: any): Promise<R> {
    try {
      Logger.log("POST Request (custom):", `${this.endpoint}/${subEndpoint}`, data);
      const response = await this.apiClient.post<R>(`${this.endpoint}/${subEndpoint}`, data);
      return response.data;
    } catch (error: any) {
      this.handleError(error, `Failed to post to custom endpoint: ${subEndpoint}`);
      throw error?.response?.data || new Error(`Failed to post to custom endpoint: ${subEndpoint}`);
    }
  }
  

  async getAll(): Promise<ApiResponse<T[]>> {
    try {
      const response = await this.apiClient.get<ApiResponse<T[]>>(this.endpoint);
      return response.data;
    } catch (error: any) {
      this.handleError(error, `Failed to fetch all records`);
      throw error?.response?.data || new Error('Failed to fetch all records');
    }
  }

  async getById(id: number | string): Promise<ApiResponse<T>> {
    try {
      const response = await this.apiClient.get<ApiResponse<T>>(`${this.endpoint}/${id}`);
      return response.data;
    } catch (error: any) {
      this.handleError(error, `Failed to fetch record with ID ${id}`);
      throw error?.response?.data || new Error(`Failed to fetch record with ID ${id}`);
    }
  }

  async create(data: any): Promise<ApiResponse<T>> {
    try {
      Logger.log("POST Request:", this.endpoint, data);
      const response = await this.apiClient.post<ApiResponse<T>>(this.endpoint, data);
      return response.data;
    } catch (error: any) {
      this.handleError(error, 'Failed to create record');
      throw error?.response?.data || new Error('Failed to create record');
    }
  }

  async filter(filter: any,subEndPoint:string): Promise<ApiResponse<T[]>> {
    try {
      Logger.log("POST Request:", this.endpoint, filter);
      const response = await this.apiClient.post<ApiResponse<T[]>>(`${this.endpoint}\\${subEndPoint}`, filter);
      return response.data;
    } catch (error: any) {
      this.handleError(error, 'Failed to create record');
      throw error?.response?.data || new Error('Failed to create record');
    }
  }


  async update(id: number | string, data: Partial<T>): Promise<ApiResponse<T>> {
    try {
      const response = await this.apiClient.put<ApiResponse<T>>(`${this.endpoint}/${id}`, data);
      return response.data;
    } catch (error: any) {
      this.handleError(error, `Failed to update record with ID ${id}`);
      throw error?.response?.data || new Error(`Failed to update record with ID ${id}`);
    }
  }

  async delete(id: number | string): Promise<void> {
    try {
      await this.apiClient.delete(`${this.endpoint}/${id}`);
      
    } catch (error: any) {
      this.handleError(error, `Failed to delete record with ID ${id}`);
      throw error?.response?.data || new Error(`Failed to delete record with ID ${id}`);
    }
  }



  private handleError(error: any, fallbackMessage: string) {
    const message = error?.response?.data?.message || fallbackMessage;
    Logger.error(fallbackMessage, error);
    showAlert(message);
  }
}
