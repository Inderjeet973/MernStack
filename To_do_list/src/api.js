// import axios from "axios";


// const API = axios.create({
//     baseURL: "http://localhost:5000/api/tasks"
// });
// export default API;
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/tasks",
});

API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");

  console.log("Token:", token); // Debug

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;