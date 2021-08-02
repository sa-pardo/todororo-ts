import React, { useState } from "react";
import { ITask } from "./components/Task";
import TaskList from "./components/TaskList";
import rectangle from "./assets/Rectangle.png";
import Pomodoro from "./components/Pomodoro";
import useMediaQuery from "./hooks/MediaQuery";

const testTasks: ITask[] = [
  { title: "this is just a sample task", isDone: false },
  { title: "task2", isDone: true },
  { title: "super tassk hardcoreeee lml 🔥", isDone: true },
];
function App() {
  const [tasks, setTasks] = useState(testTasks);
  const mediaQuery = useMediaQuery("(min-width: 768px)");

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
    <div className="App h-screen w-screen md:flex justify-center items-center p-2">
      {mediaQuery ? (
        <img
          src={rectangle}
          alt="site background"
          className="absolute left-0 top-0 h-screen w-1/2 z-[-10]"
        />
      ) : (
        <div className="absolute left-0 top-0 h-screen w-full bg-[#e45858] z-[-10]" />
      )}
      <div className="w-full md:w-1/2 h-screen flex items-center justify-center">
        <Pomodoro selectedTask={testTasks[0]} />
      </div>
      <div className="w-full md:w-1/2 h-screen flex md:items-center justify-center pt-4">
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
