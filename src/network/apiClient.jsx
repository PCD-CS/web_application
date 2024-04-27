import axios from "axios";

// export const BASE_URL = "http://127.0.0.1:8000/api/"

//export const BASE_URL = "http://65.2.188.25/api/"

export const BASE_URL = "https://payroll-pcd.onrender.com/api/"

const axiosClient = (options = {}) => {
  if (localStorage.getItem("token")) {
    options = { Authorization: `Bearer ${localStorage.getItem("token")}` };
  }
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...options,
    },
  });
};

export default axiosClient;
