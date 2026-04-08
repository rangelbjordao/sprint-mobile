import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { wakeUpApi } from "./wakeUpApi";
import { API_BASE_URL } from "./apiConfig";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("jwt_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

let isWakingUp = false;
let wakePromise: Promise<boolean> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (!isWakingUp) {
          isWakingUp = true;
          wakePromise = wakeUpApi();
        }

        const ok = await wakePromise;

        isWakingUp = false;

        if (!ok) {
          throw new Error(
            "Não foi possível conectar ao servidor. Por favor, tente novamente mais tarde.",
          );
        }

        return api(originalRequest);
      } catch (wakeError) {
        isWakingUp = false;
        return Promise.reject(wakeError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
