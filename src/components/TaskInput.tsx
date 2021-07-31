import React, { FormEvent, ReactElement, useState } from "react";
import { FiCircle, FiPlus } from "react-icons/fi";
import { ITask } from "./Task";
import styles from "./TaskInput.module.css";

interface Props {
  addTask: (task: ITask) => void;
}

interface FormElement extends HTMLFormElement {
  task: HTMLInputElement;
}

function TaskInput({ addTask }: Props): ReactElement {
  const [isFocused, setIsFocused] = useState(false);
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const taskTarget: FormElement = e.target as FormElement;
    const task: ITask = { title: taskTarget.task.value, isDone: false };
    addTask(task);
    taskTarget.task.value = "";
  };
  return (
    <div className="flex items-center border-b-[0.5px] p-4">
      <span className="flex justify-center items-center w-8 h-8">
        {isFocused ? (
          <FiPlus className={`w-5 h-5 ${styles["spin-in"]}`} />
        ) : (
          <FiCircle className={`w-5 h-5 ${styles["spin-in"]}`} />
        )}
      </span>
      <form className="w-full" onSubmit={handleSubmit}>
        <input
          className="w-full mx-2"
          name="task"
          type="text"
          onSelect={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Add a task"
        />
      </form>
    </div>
  );
}

export default TaskInput;
