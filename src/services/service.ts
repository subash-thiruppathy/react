import axios, { AxiosResponse } from 'axios';
import { jsonToQueryString } from '../core/utils/util';
import { configureAuthInterceptor } from '../core/interceptors/interceptor';

interface ApiService {
  post<T>(apiEndPoint: string, data: unknown): Promise<AxiosResponse<T>>;
  postById<T>(apiEndPoint: string, id: number, data: unknown): Promise<AxiosResponse<T>>;
  get<T>(apiEndPoint: string, queryParams?: unknown): Promise<AxiosResponse<T>>;
  getById<T>(apiEndPoint: string, id: number | string, queryParams?: unknown): Promise<AxiosResponse<T>>;
  put(apiEndPoint: string, data?: unknown): Promise<AxiosResponse<unknown>>;
  putById(apiEndPoint: string, id: number, data: unknown): Promise<AxiosResponse<unknown>>;
  delete(apiEndPoint: string, id: number): Promise<AxiosResponse<unknown>>;
}

// Use interceptor here
const instance = axios.create({ baseURL: process.env.baseUrl });
configureAuthInterceptor(instance); // Apply the interceptor



export const apiService: ApiService = {
  post<T>(apiEndPoint: string, data: unknown) {
    return instance.post<T>(process.env.baseUrl + apiEndPoint, data);
  },

  postById<T>(apiEndPoint: string, id: number, data: unknown): Promise<AxiosResponse<T>> {
    return instance.post<T>(process.env.baseUrl + apiEndPoint + `/${id}`, data);
  },

  get<T>(apiEndPoint: string, queryParams?: unknown): Promise<AxiosResponse<T>> {
    let qp = '';
    if (queryParams) {
      qp = jsonToQueryString(queryParams);
    }
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('Access-Token'),
    };
    return instance.get<T>(process.env.baseUrl + apiEndPoint + qp);
  },

  getById<T>(apiEndPoint: string, id: number | string, queryParams?: unknown): Promise<AxiosResponse<T>> {
    let qp = '';
    if (queryParams) {
      qp = jsonToQueryString(queryParams);
    }
    return instance.get<T>(process.env.baseUrl + apiEndPoint + `/${id}` + qp);
  },

  put(apiEndPoint: string, data?: unknown): Promise<AxiosResponse<unknown>> {
    return instance.put<unknown>(process.env.baseUrl + apiEndPoint, data);
  },

  putById(apiEndPoint: string, id: number, data: unknown): Promise<AxiosResponse<unknown>> {
    return instance.put<unknown>(process.env.baseUrl + apiEndPoint + `/${id}`, data);
  },

  delete(apiEndPoint: string, id: number): Promise<AxiosResponse<unknown>> {
    return instance.delete<unknown>(process.env.baseUrl + apiEndPoint + `/${id}`);
  },
};

