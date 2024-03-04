import axios from 'axios';
import { TOKEN } from '../constant';

const getLocalAccessToken = () => {
  const token = localStorage.getItem(TOKEN) ?? 'null';
  return token || '';
};

axios.defaults.baseURL =
  // "https://8510-2402-800-6106-19ce-865c-5e43-401b-a603.ngrok-free.app";
  'http://localhost:5000';

export const httpClient = async ({ method, url, data, params }) => {
  let headers = {
    Accept: '*',
    'Content-Type': 'application/json',
    'Accept-Language': '*',
  };

  const accessToken = getLocalAccessToken();
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const axiosConfig = {
    method,
    url,
    data,
    params,
    headers,
    // responseType: ,
    // withCredentials: false,
  };

  try {
    const response = await axios(axiosConfig);
    return response;
  } catch (error) {
    return error?.response;
  }
};
