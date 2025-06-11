import React, { useState } from "react";
import { useCreateTask } from "../../hooks/useTask";

export const TaskForm = ({ fetchTasks }) => {
  const [formData, setFormData] = useState({ name: "", description: "" });

  const { handleCreateTask } = useCreateTask(fetchTasks);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleCreateTask(formData.name, formData.description);
    setFormData({ name: "", description: "" });
  };

  return (
    <div className="w-full">
      <h1 className="mt-0 text-blue-600 lg:text-2xl text-lg font-semibold">Create Task</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-[12px] mt-2 w-full lg:max-w-2xl max-w-md"
      >
        <input
          type="text"
          placeholder="Task Name"
          value={formData.name}
          className="flex lg:h-12 rounded-md w-full lg:max-w-2xl max-w-md border border-input lg:px-4 px-2 lg:py-4 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <textarea
          type="text"
          placeholder="Task Description"
          rows="4"
          className="w-full lg:px-4 px-2 py-2 lg:mt-0 mt-[6px] lg:max-w-2xl max-w-md border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
        <button
          type="submit"  
          className="lg:h-10 px-4 py-2 lg:mt-0 mt-[2px] lg:w-24 max-w-md bg-purple-500 rounded-md text-white"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};
