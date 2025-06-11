import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TaskColumn } from "./TaskColumn";
import { useTasks, useUpdateTask, useDeleteTask } from "../../hooks/useTask";
import { TaskForm } from "../task/TaskForm";
import { ConfirmationModal } from "./TaskDeleteConfirmation";

export const TaskBoard = () => {
  const { tasks, loading, error, setTasks, fetchTasks } = useTasks();
  const { handleUpdateTask } = useUpdateTask();
  const { handleDeleteTask, loading: deleteTaskLoading } =
    useDeleteTask(fetchTasks);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const moveTask = async (id, newStatus) => {
    await handleUpdateTask(id, newStatus);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id ? { ...task, status: newStatus } : task
      )
    );
  };

 
  const openDeleteModal = (taskId) => {
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
    <div className="flex flex-col w-full lg:ml-0 ml-5">
      <TaskForm fetchTasks={fetchTasks} /> 
       <DndProvider backend={HTML5Backend} className="w-full lg:max-w-2xl max-w-md">
        <div className="flex flex-row justify-between lg:px-2 gap-1 mt-10">
          {["Pending", "Completed", "Done"].map((status) => (
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
    
      {/* Modal for delete task */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmDeleteTask}
        onCancel={cancelDeleteTask}
        loading={deleteTaskLoading}
      />
    </div>
  );
};
