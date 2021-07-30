import React, { useState } from "react";
import Task, { ITask } from "./components/Task";

const testTasks: ITask[] = [
  { title: "this is just a sample task", isDone: false },
  { title: "task2", isDone: true },
  { title: "super tassk hardcoreeee lml 🔥", isDone: true },
];
function App() {
  const [tasks, setTasks] = useState(testTasks);

  const toggleCompletedTask = (task: ITask): void => {
    setTasks(
      tasks.map((current) =>
        current.title !== task.title
          ? current
          : { title: task.title, isDone: !task.isDone }
      )
    );
  };

  const deleteTask = (task: ITask) => {
    setTasks(tasks.filter((current) => current.title !== task.title));
  };
  return (
    <div className="App flex flex-col justify-center aling-center h-screen w-2/5 m-auto">
      {tasks.map((task) => (
        <Task
          task={task}
          toggleCompletedTask={toggleCompletedTask}
          deleteTask={deleteTask}
          selectTask={null}
          key={task.title}
        />
      ))}
    </div>
  );
}

export default App;
