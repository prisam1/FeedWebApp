import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TaskColumn } from "./TaskColumn";
import { useTasks, useUpdateTask, useDeleteTask } from "../../hooks/useTask";
import { TaskForm } from "./TaskForm";
import { ConfirmationModal } from "./TaskDeleteConfirmation";
import { Task } from "../../types/types";

export const TaskBoard = () => {
  const { tasks, loading, error, setTasks, fetchTasks } = useTasks();
  const { handleUpdateTask } = useUpdateTask();
  const { handleDeleteTask, loading: deleteTaskLoading } = useDeleteTask(fetchTasks);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const moveTask = async (id: string, newStatus: string) => {
    await handleUpdateTask(id, { status: newStatus });
    setTasks((prevTasks: Task[]) =>
      prevTasks.map((task: Task) =>
        task._id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const openDeleteModal = (taskId: string) => {
    setTaskToDelete(taskId);
    setIsModalOpen(true);
  };

  const confirmDeleteTask = async () => {
    if (taskToDelete) {
      await handleDeleteTask(taskToDelete);
      setTaskToDelete(null);
      setIsModalOpen(false);
    }
  };

  const cancelDeleteTask = () => {
    setTaskToDelete(null);
    setIsModalOpen(false);
  };

  if (loading) return <p className="text-green-600">Loading tasks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col w-full lg:max-w-3xl max-w-md lg:ml-0 ml-0">
      <TaskForm fetchTasks={fetchTasks} />
      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-row justify-between lg:px-2 gap-1 mt-10">
          {["Pending", "Working", "Completed"].map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasks.filter((task) => task.status === status)}
              moveTask={moveTask}
              deleteTask={openDeleteModal}
            />
          ))}
        </div>
      </DndProvider>
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmDeleteTask}
        onCancel={cancelDeleteTask}
        loading={deleteTaskLoading}
      />
    </div>
  );
};