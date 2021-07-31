import React, { ReactElement, useState } from "react";
import { FiCircle, FiTrash } from "react-icons/fi";
import { BiCheck } from "react-icons/bi";
import styles from "./Task.module.css";

export interface ITask {
  title: string;
  isDone: boolean;
}

interface Props {
  task: ITask;
  toggleCompletedTask: (task: ITask) => void;
  deleteTask: (task: ITask) => void;
  selectTask: (task: ITask) => void;
}

function Task({
  task,
  toggleCompletedTask,
  deleteTask,
  selectTask,
}: Props): ReactElement {
  const [hover, setHover] = useState(false);
  return (
    <div className="flex items-center border-b-[0.5px] p-4">
      <div
        onClick={() => toggleCompletedTask(task)}
        onKeyPress={() => toggleCompletedTask(task)}
        role="button"
        tabIndex={0}
        className="relative flex cursor-pointer"
      >
        <FiCircle
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={`circle stroke-1 w-8 h-8 hover:text-blue-500 ${
            hover ? "text-blue-500" : "text-gray-500"
          }`}
        />
        <BiCheck
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={`w-6 h-6 absolute top-1 left-1 stroke-1 ${
            task.isDone ? "block" : "hidden"
          } ${hover ? "text-red-500" : "text-blue-500"}`}
        />
      </div>
      <div className="w-full flex justify-between">
        <div
          onClick={() => selectTask(task)}
          onKeyPress={() => selectTask(task)}
          role="button"
          tabIndex={0}
          className="overflow-hidden"
        >
          <p
            key={task.isDone.toString()}
            className={`mx-2 relative cursor-pointer truncate ${
              task.isDone ? styles["text-strike"] : styles["text-unstrike"]
            }`}
          >
            {task.title}
          </p>
        </div>
        <FiTrash
          onClick={() => deleteTask(task)}
          onKeyPress={() => deleteTask(task)}
          role="button"
          tabIndex={0}
          className="text-gray-300 hover:text-gray-500 min-w-[24px] min-h-[24px] cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Task;
