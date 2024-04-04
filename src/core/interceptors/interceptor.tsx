export const configureAuthInterceptor = (axiosInstance: any) => {
  axiosInstance.interceptors.request.use((config: { headers: { Authorization: string; }; }) => {
    // Add logic to modify outgoing requests (e.g., adding auth headers)
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error: any) => {
    // Handle request errors if needed
    return Promise.reject(error);
  });

  axiosInstance.interceptors.response.use((response: any) => {
    // Handle successful responses if needed
    return response;
  }, (error: any) => {
    // Handle response errors if needed
    return Promise.reject(error);
  });
};
