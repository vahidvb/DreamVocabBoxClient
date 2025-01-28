import axios from 'axios';
import { useLoadingStore } from '../stores/loadingStore';

const instance = axios.create({
  //baseURL: 'https://localhost:7011',
  baseURL: 'https://www.api.dvbox.ir',
  //baseURL: 'http://192.168.1.100:5124',
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
const emptyResponse = {
  "Data":
    null
  ,
  "IsSuccess": false,
  "StatusCode": 0,
  "Message": "Post Request Error",
}
const postRequest = async (controller, action, data = null, showLoading = true) => {
  try {
    const url = `/${controller}/${action}`;
    if (showLoading) {
      const loadingStore = useLoadingStore();
      loadingStore.startLoading();
    }
    const response = await instance.post(url, data);
    if (response.status !== 200) {
      throw new Error(response);
    }
    if (response.data != undefined)
      return response.data;
    else
      return emptyResponse;
  } catch (error) {
    if (error.status == 401) {
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
  postRequest,
  install(app) {
    app.config.globalProperties.postRequest = postRequest;
  },
};