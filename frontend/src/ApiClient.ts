import axios from 'axios';
import { ACCESS_TOKEN } from './constants';


const BASEURL:string = "http://127.0.0.1:8000";

const ApiClient = axios.create({
   baseURL: import.meta.env.VITE_API_URL || BASEURL,
});


ApiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;

    },
    (error) => {
    return Promise.reject(error);
  }

);

export default ApiClient