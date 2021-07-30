import React, { ReactElement } from "react";
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
  selectTask: null | ((task: ITask) => void);
}

function Task({
  task,
  toggleCompletedTask,
  deleteTask,
  selectTask,
}: Props): ReactElement {
  return (
    <div className="flex items-center border-t-[0.5px] p-5">
      <div
        onClick={() => toggleCompletedTask(task)}
        onKeyPress={() => toggleCompletedTask(task)}
        role="button"
        tabIndex={0}
        className="relative flex cursor-pointer"
      >
        <FiCircle className="stroke-1 w-8 h-8" />
        <BiCheck
          className={`text-blue-500 w-6 h-6 absolute top-1 left-1 stroke-1 ${
            task.isDone ? "block" : "hidden"
          }`}
        />
      </div>
      <p
        key={task.isDone.toString()}
        className={`mx-2 relative ${
          task.isDone ? styles["text-strike"] : styles["text-unstrike"]
        }`}
      >
        {task.title}
      </p>
      <FiTrash
        onClick={() => deleteTask(task)}
        onKeyPress={() => deleteTask(task)}
        role="button"
        tabIndex={0}
        className="text-gray-300 hover:text-gray-500 w-6 h-6 cursor-pointer"
      />
    </div>
  );
}

export default Task;
