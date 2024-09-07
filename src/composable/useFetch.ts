import axios from 'axios';
import type { AxiosResponse, Method } from 'axios';
import Cookies from 'js-cookie';

const authToken = `${Cookies.get('accessToken')}` ?? '';
const { VITE_APP_API_URL: base } = import.meta.env;

export default async function FetchData(
  path: string,
  method: Method,
  needToken: boolean = false,
  data: object | null = null,
) {
  const url = `${base}/${path}`;
  if (needToken) axios.defaults.headers.common.Authorization = authToken;

  const result: AxiosResponse = await axios.request({
    url,
    method,
    data,
  });

  return result;
}
