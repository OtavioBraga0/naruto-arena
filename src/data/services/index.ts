import axios from "axios";

export const initializeAxios = (): void => {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  axios.defaults.responseType = "json";
};
