import React from "react";
import { useDrop } from "react-dnd";
import { TaskCard } from "./TaskCard";

export const TaskColumn = ({ status, tasks, moveTask, deleteTask }) => {
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item) => {
      if (item.status !== status) {
        moveTask(item.id, status);
      }
    },
  });

  return (
    <div
      ref={drop}
      className="flex flex-col border-[1px] border-gray-400 px-1 bg-teal-100 pt-2 lg:rounded-2xl rounded-xl w-full"
    >
      <h3 className="text-center lg:text-base text-sm">{status}</h3>
      <div className="border-b-[1px] lg:mt-2 mt-1 border-gray-400" />
      <div className="flex flex-col lg:mt-3 mt-1 w-full justify-center">
        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <TaskCard key={task._id} task={task} deleteTask={deleteTask} />
          ))}
      </div>
    </div>
  );
};
