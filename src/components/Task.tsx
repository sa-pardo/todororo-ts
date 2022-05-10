import React, { ReactElement, useContext, useState } from "react";
import { FiCircle, FiTrash } from "react-icons/fi";
import { BiCheck } from "react-icons/bi";
import styles from "./Task.module.css";
import ReducerContext from "../context/ReducerContext";
import { ITask } from "../state";

interface CircleCheckProps {
  readOnly: boolean;
  task: ITask;
}

function CircleCheck({ readOnly, task }: CircleCheckProps): ReactElement {
  const [hover, setHover] = useState(false);
  const dispatch = useContext(ReducerContext);
  if (readOnly) {
    return (
      <div className="relative flex">
        <FiCircle className="circle stroke-1 w-8 h-8 text-gray-500" />
        <BiCheck
          className={`w-6 h-6 absolute top-1 left-1 stroke-1 text-blue-500 ${
            task.isDone ? "block" : "hidden"
          }`}
        />
      </div>
    );
  }
  return (
    <div
      onClick={() => dispatch({ type: "toggle", task })}
      onKeyPress={() => dispatch({ type: "toggle", task })}
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
  );
}

interface TaskTitleProps {
  readOnly: boolean;
  task: ITask;
}

function TaskTitle({ readOnly, task }: TaskTitleProps): ReactElement {
  const dispatch = useContext(ReducerContext);
  if (readOnly) {
    return (
      <div className="overflow-hidden">
        <p
          key={task.title + task.isDone.toString()}
          className={`mx-2 relative truncate ${
            task.isDone ? styles["text-strike"] : styles["text-unstrike"]
          }`}
        >
          {task.title}
        </p>
      </div>
    );
  }
  return (
    <div
      onClick={() => dispatch({ type: "select", task })}
      onKeyPress={() => dispatch({ type: "select", task })}
      role="button"
      tabIndex={0}
      className="overflow-hidden"
    >
      <p
        key={task.title + task.isDone.toString()}
        className={`mx-2 relative cursor-pointer truncate ${
          task.isDone ? styles["text-strike"] : styles["text-unstrike"]
        }`}
      >
        {task.title}
      </p>
    </div>
  );
}

export interface Props {
  task: ITask;
  readOnly?: boolean;
}

function Task({ task, readOnly = false }: Props): ReactElement {
  const dispatch = useContext(ReducerContext);
  return (
    <div
      className={`flex items-center ${readOnly ? "" : "border-b-[0.5px]"} p-4`}
    >
      <CircleCheck task={task} readOnly={readOnly} />
      <div className="w-full overflow-hidden flex justify-between">
        <TaskTitle task={task} readOnly={readOnly} />
        {readOnly ? null : (
          <FiTrash
            onClick={() => dispatch({ type: "delete", task })}
            onKeyPress={() => dispatch({ type: "delete", task })}
            role="button"
            tabIndex={0}
            className="text-gray-300 hover:text-gray-500 min-w-[24px] min-h-[24px] cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}

export default Task;
