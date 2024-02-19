import axios from "axios";

export default axios.create({
  baseURL: "https://kanban-task-management-backend-gilt.vercel.app/api",
});
