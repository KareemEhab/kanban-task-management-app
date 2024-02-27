import axios from "axios";

export default axios.create({
  //baseURL: "http://localhost:5000/api",
  baseURL: "https://kanban-task-management-backend-gilt.vercel.app/api",
});
