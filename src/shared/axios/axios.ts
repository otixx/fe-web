import axios from "axios";
import Cookies from "js-cookie";
const privateApi = axios.create({
  baseURL: import.meta.env.VITE_BE_URL,
});

const publicAPi = axios.create({
  baseURL: import.meta.env.VITE_BE_URL,
});

privateApi.interceptors.request.use(
  async function (config) {
    const access_token = Cookies.get("token");
    const token = access_token && JSON.parse(access_token);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export { privateApi, publicAPi };
