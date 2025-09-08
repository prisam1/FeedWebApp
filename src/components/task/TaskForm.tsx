import React, { useState } from "react";
import { useCreateTask } from "../../hooks/useTask";

export const TaskForm = ({ fetchTasks }: any) => {
  const [formData, setFormData] = useState({ name: "", description: "" });

  const { handleCreateTask } = useCreateTask(fetchTasks);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await handleCreateTask(formData.name, formData.description);
    setFormData({ name: "", description: "" });
  };

  return (
    <div className="w-full lg:max-w-4xl">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-[12px] mt-2 w-full lg:max-w-2xl max-w-md"
      >
        <input
          type="text"
          placeholder="Task Name"
          value={formData.name}
          className="lg:h-12 rounded-md w-full lg:max-w-2xl max-w-md border lg:px-4 px-2 lg:py-4 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Task Description"
          rows={3}
          className="w-full lg:px-4 px-2 py-2 lg:mt-0 mt-[6px] lg:max-w-2xl border max-w-md rounded-md text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
