import axios from "axios";

const backendApi = axios.create({
  baseURL: "http://localhost:5001",
});

//handles preflight error
axios.interceptors.response.use(null!, (error) => {
  if (error && error.message === "Network Error") {
    throw new Error(`Potential network CORS preflight error at ${error.config.url}`);
  }
  throw error;
});

backendApi.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user")!);
  config.headers!["Authorization"] = `${user.username} ${user.token}`;
  return config;
});

export default backendApi;
