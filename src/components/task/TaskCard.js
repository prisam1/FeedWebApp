import React from "react";
import { useDrag } from "react-dnd";
import { X } from "lucide-react";

export const TaskCard = ({ task, deleteTask }) => {
  const [, drag] = useDrag({
    type: "TASK",
    item: { id: task._id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDeleteTask = () => {
    deleteTask(task._id);
  };

  return (
    <div
      ref={drag}
      className="cursor-move rounded-2xl bg-amber-400 px-2 py-2 mb-2 flex flex-row w-full justify-between"
    >
      <div className="px-2">
        <h4 className="font-semibold leading-none">{task.name}</h4>
        <p className="text-sm mt-2 leading-none">{task.description}</p>
      </div>
      <button
        onClick={handleDeleteTask}
        className="self-start border-[2px] ml-2 border-black rounded-full"
      >
        <X className="w-4 h-4 " />
      </button>
    </div>
  );
};
