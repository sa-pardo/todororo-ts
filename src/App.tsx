import React, { useState } from "react";
import { ITask } from "./components/Task";
import TaskList from "./components/TaskList";
import rectangle from "./assets/Rectangle.png";
import Pomodoro from "./components/Pomodoro";

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
    <div className="App h-screen w-screen flex justify-center items-center">
      <img
        src={rectangle}
        alt="site background"
        className="absolute left-0 top-0 h-screen w-1/2 block z-[-10]"
      />
      <div className="w-1/2 h-screen flex items-center justify-center">
        <Pomodoro selectedTask={testTasks[0]} />
      </div>
      <div className="w-1/2 h-screen flex items-center justify-center">
        <TaskList
          tasks={tasks}
          toggleCompletedTask={toggleCompletedTask}
          deleteTask={deleteTask}
          selectTask={selectTask}
          addTask={addTask}
        />
      </div>
    </div>
  );
}

export default App;
