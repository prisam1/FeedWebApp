import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getTasks, createTask, updateTask,deleteTask } from "../services/task/index";

export const useCreateTask = (fetchTasks) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateTask = async (name, description) => {
    setLoading(true);
    setError(null);
    try {
      const data = await createTask(name, description);

      if (fetchTasks) {
        fetchTasks();
      }

      return data;
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
      toast.error(
        err.response?.data?.error ||
          "An unexpected error occurred. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateTask, loading, error };
};

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
      toast.error(
        err.response?.data?.error ||
          "An unexpected error occurred. Please try again"
      );
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdateTask = async (taskId, updates) => {
    setLoading(true);
    setError(null);

    try {
      const data = await updateTask(taskId, updates);

      return data;
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
      toast.error(
        err.response?.data?.error ||
          "An unexpected error occurred. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdateTask, loading, error };
};


export const useDeleteTask = (fetchTasks) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteTask = async (taskId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteTask(taskId);
      toast.success("Task deleted successfully");

      if (fetchTasks) {
        fetchTasks(); // Refresh task list
      }
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
      toast.error(
        err.response?.data?.error ||
          "An unexpected error occurred. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return { handleDeleteTask, loading, error };
};