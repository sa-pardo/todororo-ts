import React, { ReactElement } from "react";
import { ITask } from "../state";
import Task from "./Task";
import TaskInput from "./TaskInput";

interface Props {
  tasks: ITask[];
}

function TaskList({ tasks }: Props): ReactElement {
  return (
    <div className="w-full md:max-w-[80%]">
      <h2 className="font-semibold text-3xl mb-4">To-Do List</h2>
      <TaskInput />
      {tasks.map((task) => (
        <Task task={task} key={task.id} />
      ))}
    </div>
  );
}

export default TaskList;
