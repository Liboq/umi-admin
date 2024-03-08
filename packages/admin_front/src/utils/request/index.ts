import { notification } from 'antd';
import axios, { AxiosRequestHeaders } from 'axios';

const { UMI_APP_BASEURL } = process.env;

const instance = axios.create({ baseURL: UMI_APP_BASEURL });

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || '';

    config.headers = {
      ...config.headers,
      Authorization: token,
    } as AxiosRequestHeaders;

    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  //状态码为2xx的时候执行
  (response) => {
    console.log(response);

    const { data } = response;
    const { statusCode } = data;
    console.log(data);

    if (statusCode !== 200) {
      notification.error({
        message: data.message,
      });
    }
    data.success = true;

    return data;
  },
  //状态码不为2xx的时候执行
  (error) => {
    const { response } = error;
    console.log(response);

    return Promise.reject(error);
  },
);

export default instance;
