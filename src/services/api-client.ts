import axios from "axios";

const apiClient = axios.create({
  //baseURL: "http://localhost:5000/api",
  baseURL: "https://kanban-task-management-backend-gilt.vercel.app/api",
});

// Add a request interceptor to update the x-auth-token header before each request is sent
apiClient.interceptors.request.use(
  (config) => {
    // Get the current token from local storage
    const token = localStorage.getItem("token");
    // If a token exists, set the x-auth-token header in the request config
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default apiClient;
