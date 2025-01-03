import axios from 'axios';
import { useLoadingStore } from '../stores/loadingStore';

const instance = axios.create({
  //baseURL: 'https://localhost:7011',
  baseURL: 'https://api.dvbox.ir',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const loadingStore = useLoadingStore();
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  loadingStore.startLoading();
  return config;
}, (error) => {
  const loadingStore = useLoadingStore();
  loadingStore.stopLoading();
  return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
  const loadingStore = useLoadingStore();
  loadingStore.stopLoading();
  return response;
}, (error) => {
  const loadingStore = useLoadingStore();
  loadingStore.stopLoading();
  return Promise.reject(error);
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
