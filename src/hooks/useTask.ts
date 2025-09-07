import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getTasks, createTask, updateTask,deleteTask } from "../services/task/index";
import { Task, TaskUpdates } from "../types/types";

export const useCreateTask = (fetchTasks: ()=> void) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateTask = async (name:string, description:string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await createTask(name, description);

      if (fetchTasks) {
        fetchTasks();
      }

      return data;
    } catch (err) {
      
      const errorMessage = (err as any)?.response?.data?.error || "An unexpected error occurred. Please try again";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateTask, loading, error };
};

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string|null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      const errorMessage = (err as any)?.response?.data?.error || "An unexpected error occurred. Please try again";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, setTasks, loading, error, fetchTasks };
};

export const useUpdateTask = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateTask = async (taskId:string, status:TaskUpdates) => {
    setLoading(true);
    setError(null);

    try {
      const data = await updateTask(taskId, status);

      return data;
    } catch (err) {
      const errorMessage = (err as any)?.response?.data?.error || "An unexpected error occurred. Please try again";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdateTask, loading, error };
};


export const useDeleteTask = (fetchTasks:any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null> (null);

  const handleDeleteTask = async (taskId:string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteTask(taskId);
      toast.success("Task deleted successfully");

      if (fetchTasks) {
        fetchTasks();  // -----------------> Refresh task list
      }
    } catch (err) {
      const errorMessage = (err as any)?.response?.data?.error || "An unexpected error occurred. Please try again";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { handleDeleteTask, loading, error };
};