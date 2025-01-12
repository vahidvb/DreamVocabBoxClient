import axios from 'axios';
import { useLoadingStore } from '../stores/loadingStore';

const instance = axios.create({
  //baseURL: 'https://localhost:7011',
  //baseURL: 'https://api.dvbox.ir',
  baseURL: 'http://192.168.1.100:5124',
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
}, (error) => {
  return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
  return response;
}, (error) => {

  return Promise.reject(error);
});

const postRequest = async (controller, action, data = null, showLoading = true) => {
  try {
    const url = `/${controller}/${action}`;
    if (showLoading) {
      const loadingStore = useLoadingStore();
      loadingStore.startLoading();
    }
    const response = await instance.post(url, data);

    return response.data;
  } catch (error) {
    if(error.status == 401){
      localStorage.removeItem('token');
      window.location.href = '/Login';
    }
  } finally {
    if (showLoading) {
      const loadingStore = useLoadingStore();
      loadingStore.stopLoading();
    }
  }
};

export default {
  install(app) {
    app.config.globalProperties.postRequest = postRequest;
  },
};
