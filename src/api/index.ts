import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_DEV_URL + "/api/v1";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.accessToken;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "*/*";

export default axios;

export { default as mediaApi } from "./media";
export { default as accountApi } from "./personal-account";
export { default as securityApi } from "./security";
export { default as userApi } from "./users";
export { default as communicationApi } from "./communication";
export { default as mentorCatalogApi } from "./mentor-catalog";
export { default as coursesApi } from "./courses";
