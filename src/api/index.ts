import axios from "axios";

// Создаем экземпляр Axios с базовыми настройками
const api = axios.create({
  baseURL: import.meta.env.VITE_DEV_URL + "/api/v1",
});

// Добавляем интерцептор запросов (добавляет Access Token к каждому запросу)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "*/*";
  }
  return config;
});

// Добавляем интерцептор ответов для обработки 401 ошибки
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(
          "/auth/refresh",
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.refreshToken,
            },
            baseURL: import.meta.env.VITE_DEV_URL + "/api/v1",
          }
        );
        localStorage.setItem("accessToken", data.accessToken);
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;

export { default as mediaApi } from "./media";
export { default as accountApi } from "./personal-account";
export { default as securityApi } from "./security";
export { default as userApi } from "./users";
export { default as communicationApi } from "./communication";
export { default as mentorCatalogApi } from "./mentor-catalog";
export { default as coursesApi } from "./courses";
export { default as progressApi } from "./progress";
