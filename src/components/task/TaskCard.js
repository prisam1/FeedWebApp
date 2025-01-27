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
      className="cursor-move lg:rounded-2xl rounded-xl bg-amber-400 lg:px-2 px-1 py-2 lg:mb-2 mb-1 flex flex-row w-full justify-between"
    >
      <div className="lg:px-2 px-1">
        <h4 className="font-semibold leading-none lg:text-base text-xs">{task.name}</h4>
        <p className="lg:text-sm mt-2 leading-none text-[10px]">{task.description}</p>
      </div>
      <button
        onClick={handleDeleteTask}
        className="self-start lg:border-[2px] border-[1px] ml-2 border-black rounded-full"
      >
        <X className="lg:w-4 lg:h-4 w-2.5 h-2.5" />
      </button>
    </div>
  );
};
