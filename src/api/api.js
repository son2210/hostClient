import axios from 'axios';

import store from './../redux/store';

const requestInterceptor = (req) => {
  const { accessToken } = store.getState().auth;
  if (accessToken) {
    req.headers.Authorization = 'Bearer ' + accessToken;
  }
  return req;
};

const responseInterceptor = (res) => {
  return res;
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(responseInterceptor);

export default api;
