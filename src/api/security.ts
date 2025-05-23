import { UUID } from "crypto";
import { LoginData, RegisterData } from "../types";
import api from "./index";
import axios from "axios";

export default {
  registerUser: async (userData: RegisterData) => {
    const axiosInstance = axios.create();
    delete axiosInstance.defaults.headers.common["Authorization"];
    const response = await axiosInstance.post(`/auth/register`, userData);
    return response;
  },

  login: async (userData: LoginData, data: { deviceId: UUID }) => {
    const base64Credentials = btoa(`${userData.login}:${userData.password}`);
    const response = await api.post(`/auth/login`, data, {
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    });
    return response;
  },

  logout: async () => {
    const response = await api.post(`/auth/logout`, null, {
      headers: {
        Authorization: "Bearer" + localStorage.refreshToken,
      },
    });
    return response;
  },

  refresh: async () => {
    const response = await api.post(`/auth/refresh`, null, {
      headers: {
        Authorization: "Bearer " + localStorage.refreshToken,
      },
    });
    return response;
  },
};
