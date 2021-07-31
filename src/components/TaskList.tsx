import React, { ReactElement } from "react";
import Task, { ITask } from "./Task";
import TaskInput from "./TaskInput";

interface Props {
  tasks: ITask[];
  toggleCompletedTask: (task: ITask) => void;
  deleteTask: (task: ITask) => void;
  selectTask: (task: ITask) => void;
  addTask: (task: ITask) => void;
}

const compareByBooleans = (a: ITask, b: ITask) => {
  if (a.isDone && b.isDone) {
    return 0;
  }
  if (a.isDone) {
    return 1;
  }
  return -1;
};

function TaskList({
  tasks,
  toggleCompletedTask,
  deleteTask,
  selectTask,
  addTask,
}: Props): ReactElement {
  return (
    <div>
      <h2 className="font-semibold text-3xl mb-4">To-Do List</h2>
      <TaskInput addTask={addTask} />
      {tasks.sort(compareByBooleans).map((task) => (
        <Task
          task={task}
          toggleCompletedTask={toggleCompletedTask}
          deleteTask={deleteTask}
          selectTask={selectTask}
          key={task.title}
        />
      ))}
    </div>
  );
}

export default TaskList;
