import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const localIp = "192.168.15.58";
const porta = 8080;

export const API_BASE_URL = `http://${localIp}:${porta}`;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
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
  (error) => Promise.reject(error)
);

export default api;
