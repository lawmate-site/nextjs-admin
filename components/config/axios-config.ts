import axios, { AxiosInstance } from "axios";
import { parseCookies } from "nookies";
import {
  adminURL,
  chatURL,
  lawyerURL,
  manageURL,
  userURL,
} from "../common/url";

export const userInstance = () => {
  const userInstance = axios.create({ baseURL: userURL });
  setInterceptor(userInstance);
  return userInstance;
};

export const lawyerInstance = () => {
  const lawyerInstance = axios.create({ baseURL: lawyerURL });
  setInterceptor(lawyerInstance);
  return lawyerInstance;
};

export const adminInstance = () => {
  const adminInstance = axios.create({ baseURL: "http://localhost:8082" });
  setInterceptor(adminInstance);
  return adminInstance;
};

export const adminFileInstance = () => {
  const adminFileInstance = axios.create({ baseURL: "http://localhost:8082" });
  setFileInterceptor(adminFileInstance);
  return adminFileInstance;
};

export const chatInstance = () => {
  const chatInstance = axios.create({ baseURL: chatURL });
  setInterceptor(chatInstance);
  return chatInstance;
};

export const manageInstance = () => {
  const manageInstance = axios.create({ baseURL: manageURL });
  setInterceptor(manageInstance);
  return manageInstance;
};

export const setInterceptor = (inputInstance: AxiosInstance) => {
  inputInstance.interceptors.request.use(
    (config) => {
      config.headers["Content-Type"] = "application/json";
      config.headers["Authorization"] = `Bearer ${parseCookies().accessToken}`;
      return config;
    },
    (error) => {
      console.log("AXIOS INTERSEPTOR ERROR OCCURED : ");
      console.log(error);
      return Promise.reject(error);
    }
  );
  inputInstance.interceptors.response.use((response) => {
    if (response.status === 404) console.log("AXIOS INTERSEPTOR CATHCES 404");

    return response;
  });
  return inputInstance;
};

export const setFileInterceptor = (inputInstance: AxiosInstance) => {
  inputInstance.interceptors.request.use(
    (config) => {
      config.headers["Content-Type"] = "multipart/form-data";
      config.headers["Authorization"] = `Bearer ${parseCookies().accessToken}`;
      return config;
    },
    (error) => {
      console.log("AXIOS INTERSEPTOR ERROR OCCURED : ");
      console.log(error);
      return Promise.reject(error);
    }
  );
  inputInstance.interceptors.response.use((response) => {
    if (response.status === 404) console.log("AXIOS INTERSEPTOR CATHCES 404");

    return response;
  });
  return inputInstance;
};
