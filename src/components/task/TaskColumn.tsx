import React, { Ref } from "react";
import { useDrop } from "react-dnd";
import { TaskCard } from "./TaskCard";
import { DragItem, Task } from "../../types/types";

interface TaskColumnProps {
  status: string;
  tasks: Task[];
  moveTask: (id: string, newStatus: string) => void;
  deleteTask: (id: string) => void;
}

export const TaskColumn: React.FC<TaskColumnProps> = ({ status, tasks, moveTask, deleteTask }) => {
  const [, drop] = useDrop<DragItem>({
    accept: "TASK",
    drop: (item) => {
      if (item.status !== status) {
        moveTask(item.id, status);
      }
    },
  });

  const columnTasks = tasks.filter((task) => task.status === status);

  return (
    <div
      ref={drop as unknown as Ref<HTMLDivElement>}
      className="flex flex-col border-[1px] border-gray-400 px-1 bg-teal-100 pt-2 lg:rounded-2xl rounded-xl w-56"
    >
      <h3 className="text-center lg:text-base text-sm">{status}</h3>
      <div className="border-b-[1px] lg:mt-2 mt-1 border-gray-400" />
      <div className="flex flex-col lg:mt-3 mt-1 justify-center">
        {columnTasks.length > 0 ? (
          columnTasks.map((task) => (
            <TaskCard key={task._id} task={task} deleteTask={deleteTask} />
          ))
        ) : (
          <p className="text-center text-gray-500 italic mt-4">
            Move here your {status.toLowerCase()} task
          </p>
        )}
      </div>
    </div>
  );
};