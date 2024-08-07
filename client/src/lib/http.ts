// Http.ts

import axios, { AxiosInstance } from "axios";
import config from "@/constants/config";
import {
  clearLS,
  getAccessTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
} from "./auth";
import { URL_LOGIN, URL_LOGOUT } from "@/apis/auth.api";

class Http {
  private static instance: AxiosInstance | null = null;
  private static accessToken: string | null = getAccessTokenFromLS() || null;

  private constructor() {}

  public static getInstance(): AxiosInstance {
    if (Http.instance === null) {
      Http.instance = axios.create({
        baseURL: config.baseUrl,
        timeout: 10000,
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Setup interceptors
      Http.instance.interceptors.request.use(
        (config) => {
          if (Http.accessToken && config.headers) {
            config.headers.authorization = `Bearer ${Http.accessToken}`;
            console.log(config.headers.authorization);
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      Http.instance.interceptors.response.use(
        (response) => {
          const { url } = response.config;
          if (url === URL_LOGIN) {
            const data = response.data;
            Http.accessToken = data.data.token;
            setAccessTokenToLS(Http.accessToken as string);
            setProfileToLS(data.data.user);
          } else if (url === URL_LOGOUT) {
            Http.accessToken = null;
            clearLS();
          }
          return response;
        },
        (error) => Promise.reject(error)
      );
    }

    return Http.instance;
  }
}

export default Http.getInstance();
