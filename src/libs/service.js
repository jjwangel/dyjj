import axios from 'axios';
import env from '../../build/env';
import store from '@/store';

const ajaxUrl = env === 'development' ?
  'http://127.0.0.1:3000' :
  env === 'production' ?
  'https://www.url.com' :
  'https://debug.url.com';

const service = axios.create({
  baseURL: ajaxUrl,
  timeout: 30000
});

// reques拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  config.headers['J-Token'] = store.getters.token; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
});

// respone拦截器
service.interceptors.response.use(response => {
  return response;
}, error => {
  console.log(error) // for debug
  return Promise.reject(error)
});

export default service
