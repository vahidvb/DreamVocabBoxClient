import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:7011',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const postRequest = async (controller, action, data = null) => {
  try {
    const url = `/${controller}/${action}`;
    const response = await instance.post(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export default {
  install(app) {
    app.config.globalProperties.postRequest = postRequest;
  },
};
