import axios from 'axios';
import {ENTRY_POINT, REQUEST_TIMEOUT} from './const';

const Error = {
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400
};

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: ENTRY_POINT,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onError = (err) => {
    const {response} = err;

    if (response.status === Error.UNAUTHORIZED || response.status === Error.BAD_REQUEST) {
      onUnauthorized();

      // Бросаем ошибку, потому что нам важно прервать цепочку промисов после запроса авторизации.
      // Запрос авторизации - это особый случай и важно дать понять приложению, что запрос был неудачным.
      throw err;
    }
    if (response.status !== Error.SUCCESS) {

      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onError);
  return api;
};
