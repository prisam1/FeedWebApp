import api from "../api";

// Task APIs
export const getTasks = async () => {
  const { data } = await api.get("/tasks");
  return data;
};

export const createTask = async (name, description) => {
  const { data } = await api.post("/tasks", { name, description });
  return data;
};

export const updateTask = async (taskId, updates) => {
  const { data } = await api.put(`/tasks/${taskId}`, { updates });
  return data;
};

export const deleteTask = async (taskId) => {
  const { data } = await api.delete(`/tasks/${taskId}`);
  return data;
};
