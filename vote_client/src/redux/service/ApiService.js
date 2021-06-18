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

apiService.interceptors.response.use(
  (response) => {
    const { url, method } = response.config;
    if (response.status === 204 && url === '/api/login' && method === 'post') {
      const token = response.headers['x-auth-token'];
      localStorage.setItem('token', token);
    }
    if (response.status === 204 && url === '/api/logout' && method === 'post') {
      localStorage.removeItem('token');
      localStorage.removeItem('editedColumns');
      localStorage.removeItem('viewedColumns');
    }
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  },
);

export default apiService;
