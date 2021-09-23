import { API, Auth } from 'aws-amplify';
import { customResponseType } from '../Hooks/useApi';
const apiName = 'execute-api';

export const get = async (
  url: string,
  serviceType: string,
  customResponse: customResponseType | null
) => {
  let accessToken = null;
  try {
    const currentSession = await Auth.currentSession();
    accessToken = currentSession?.getAccessToken()?.getJwtToken();
  } catch (e) {
    console.error(e);
  }

  const path = `/${serviceType}/v1${url}`;
  let config: any = {
    headers: {},
    response: true,
  };

  if (customResponse?.responseType) {
    config = { ...config, responseType: customResponse?.responseType };
  }

  if (accessToken) {
    config.headers = { ...config.headers, accessToken };
  }
  return API.get(apiName, path, config)
    .then(res => res)
    .catch(error => {
      console.log(error);
      return error.response;
    });
};

export const post = async (url: string, data: object, serviceType: string) => {
  let accessToken = null;
  try {
    const currentSession = await Auth.currentSession();
    accessToken = currentSession?.getAccessToken()?.getJwtToken();
  } catch (e) {
    console.error(e);
  }

  const path = `/${serviceType}/v1${url}`;

  let config: any = {
    headers: {
      'Content-Type': 'application/json',
    },
    response: true,
    body: data,
  };

  if (accessToken) {
    config.headers = { ...config.headers, accessToken };
  }
  return API.post(apiName, path, config)
    .then(res => res)
    .catch(error => error.response);
};

export const put = async (url: string, data: object, serviceType: string) => {
  let accessToken = null;
  try {
    const currentSession = await Auth.currentSession();
    accessToken = currentSession?.getAccessToken()?.getJwtToken();
  } catch (e) {
    console.error(e);
  }

  const path = `/${serviceType}/v1${url}`;
  let config: any = {
    headers: {},
    response: true,
    body: data,
  };

  if (accessToken) {
    config.headers = { ...config.headers, accessToken };
  }
  return API.put(apiName, path, config)
    .then(res => res)
    .catch(error => error.response);
};

export const deleteRequest = async (
  url: string,
  data: object,
  serviceType: string
) => {
  let accessToken = null;
  try {
    const currentSession = await Auth.currentSession();
    accessToken = currentSession?.getAccessToken()?.getJwtToken();
  } catch (e) {
    console.error(e);
  }

  const path = `/${serviceType}/v1${url}`;
  const config: any = {
    headers: {},
    response: true,
    body: data,
  };
  if (accessToken) {
    config.headers = { ...config.headers, accessToken };
  }
  return API.del(apiName, path, config)
    .then(res => res)
    .catch(error => error.response);
};
