import React, { useState } from "react";
import { ITask } from "./components/Task";
import TaskList from "./components/TaskList";

const testTasks: ITask[] = [
  { title: "this is just a sample task", isDone: false },
  { title: "task2", isDone: true },
  { title: "super tassk hardcoreeee lml 🔥", isDone: true },
];
function App() {
  const [tasks, setTasks] = useState(testTasks);

  const toggleCompletedTask = (task: ITask): void => {
    const updatedTasks = tasks.map((current) =>
      current.title !== task.title
        ? current
        : { title: task.title, isDone: !task.isDone }
    );
    setTasks(updatedTasks);
  };

  const addTask = (task: ITask) => {
    setTasks([task, ...tasks]);
  };

  const deleteTask = (task: ITask) => {
    setTasks(tasks.filter((current) => current.title !== task.title));
  };

  const selectTask = (task: ITask) => {
    console.log(task.title);
  };

  return (
    <div className="">
      <TaskList
        tasks={tasks}
        toggleCompletedTask={toggleCompletedTask}
        deleteTask={deleteTask}
        selectTask={selectTask}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
