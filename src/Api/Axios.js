import axios from "axios";

export const callAxiosApi = axios.create({
  baseURL: import.meta.env.VITE_BASEURL_V1,
  withCredentials: true,
});
