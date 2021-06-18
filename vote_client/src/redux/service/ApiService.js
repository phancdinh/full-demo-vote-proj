import axios from 'axios';

const apiService = axios.create();

apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const newConfig = {
      ...config,
      headers: { Authorization: `Bearer ${token}`, ...config.headers },
    };
    return newConfig;
  },
  (error) => {
    // Do something with request error
    Promise.reject(error);
  },
);

export default apiService;
