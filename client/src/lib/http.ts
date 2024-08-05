import config from "@/constants/config";
import axios, { type AxiosInstance } from "axios";
import {
  clearLS,
  getAccessTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
} from "./auth";
import { URL_LOGIN, URL_LOGOUT } from "@/apis/auth.api";

class Http {
  instance: AxiosInstance;
  private accessToken: string;
  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use((response) => {
      const { url } = response.config;
      if (url === URL_LOGIN) {
        const data = response.data;
        this.accessToken = data.data.token;
        setAccessTokenToLS(this.accessToken);
        setProfileToLS(data.data.user);
      } else if (url === URL_LOGOUT) {
        this.accessToken = "";
        clearLS();
      }
      return response;
    });
  }
}
const http = new Http().instance;
export default http;
