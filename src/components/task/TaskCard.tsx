import { useDrag } from "react-dnd";
import { X } from "lucide-react";
import React, { Ref } from "react";
import { DragItem, Task } from "../../types/types";

interface TaskCardProps {
  task: Task;
  deleteTask: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, deleteTask }) => {
  const [, drag] = useDrag<DragItem, unknown, { isDragging: boolean }>({
    type: "TASK",
    item: { id: task._id, status: task.status, type: "TASK" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDeleteTask = () => {
    deleteTask(task._id);
  };

  const statusColors: { [key: string]: string } = {
    Pending: "bg-yellow-400",
    Working: "bg-blue-400",
    Completed: "bg-green-400",
  };

  const cardColor = statusColors[task.status] || "bg-gray-400";  // Fallback color

  return (
    <div
      ref={drag as unknown as Ref<HTMLDivElement>}
      className={`cursor-move lg:rounded-2xl rounded-xl ${cardColor} lg:px-2 px-1 py-2 lg:mb-2 mb-1 flex flex-row w-full justify-between`}
    >
      <div className="lg:px-2 px-1 w-full overflow-hidden">
        <h4 className="font-semibold leading-none lg:text-base text-xs break-words">{task.name.length > 20
          ? task.name.slice(0, 15) + "..."
          : task.name}</h4>
        <p className="lg:text-sm mt-2 max-w-sm leading-none text-[10px] break-words">{task.description.length > 25
          ? task.description.slice(0, 30) + "..."
          : task.description}</p>
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