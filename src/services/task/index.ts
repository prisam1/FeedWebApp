import { TaskUpdates } from "../../types/types";
import api from "../api";

// Task APIs
export const getTasks = async () => {
  const { data } = await api.get("/tasks");
  return data;
};

export const createTask = async (name: string, description: string) => {
  const { data } = await api.post("/tasks", { name, description });
  return data;
};

export const updateTask = async (taskId: string, updates: TaskUpdates) => {
  const { data } = await api.put(`/tasks/${taskId}`, updates );
  return data;
};

export const deleteTask = async (taskId: string) => {
  const { data } = await api.delete(`/tasks/${taskId}`);
  return data;
};
