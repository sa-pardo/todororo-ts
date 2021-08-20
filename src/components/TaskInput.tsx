import React, { FormEvent, ReactElement, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FiCircle, FiPlus } from "react-icons/fi";
import ReducerContext from "../context/ReducerContext";
import styles from "./TaskInput.module.css";
import { ITask } from "../state";

interface FormElement extends HTMLFormElement {
  task: HTMLInputElement;
}

function TaskInput(): ReactElement {
  const dispatch = useContext(ReducerContext);
  const [isFocused, setIsFocused] = useState(false);
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const taskTarget: FormElement = e.target as FormElement;
    const task: ITask = {
      id: uuidv4(),
      title: taskTarget.task.value,
      isDone: false,
    };
    dispatch({ type: "add", task });
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
