import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaGithub } from "react-icons/fa";
// eslint-disable-next-line import/no-cycle
import { ITask } from "./components/Task";
// eslint-disable-next-line import/no-cycle
import TaskList from "./components/TaskList";
import rectangle from "./assets/Rectangle.png";
// eslint-disable-next-line import/no-cycle
import Pomodoro from "./components/Pomodoro";
import useMediaQuery from "./hooks/MediaQuery";
// eslint-disable-next-line import/no-cycle
import ReducerContext from "./ReducerContext";

const testTasks: ITask[] = [
  { id: uuidv4(), title: "this is just a sample task", isDone: false },
  { id: uuidv4(), title: "task2", isDone: true },
  { id: uuidv4(), title: "super tassk hardcoreeee lml 🔥", isDone: true },
];

export interface ReducerActions {
  type: "toggle" | "add" | "delete" | "select";
  task: ITask;
}

interface State {
  tasks: ITask[];
  selectedTask: ITask | null;
}

function reducer(state: State, action: ReducerActions): State {
  switch (action.type) {
    case "toggle": {
      const aux: ITask = { ...action.task, isDone: !action.task.isDone };
      const newState = {
        tasks: state.tasks.map((current) =>
          current.id !== action.task.id ? current : aux
        ),
        selectedTask:
          state.selectedTask?.id !== action.task.id ? state.selectedTask : aux,
      };
      newState.tasks.sort((a: ITask, b: ITask) => +a.isDone - +b.isDone);
      return newState;
    }
    case "add":
      return {
        tasks: [action.task, ...state.tasks],
        selectedTask: state.selectedTask,
      };
    case "delete":
      return {
        tasks: state.tasks.filter((current) => current.id !== action.task.id),
        selectedTask:
          state.selectedTask?.id !== action.task.id ? state.selectedTask : null,
      };
    case "select":
      return { tasks: state.tasks, selectedTask: action.task };
    default:
      return state;
  }
}

const initialState: State = {
  tasks: testTasks,
  selectedTask: null,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mediaQuery = useMediaQuery("(min-width: 768px)");

  return (
    <ReducerContext.Provider value={dispatch}>
      <a
        href="https://github.com/sa-pardo/todororo-ts"
        target="_blank"
        rel="noreferrer noopener"
        className="absolute right-4 top-4"
      >
        <FaGithub className="w-7 h-7 text-gray-600 hover:text-black" />
      </a>
      <div className="App h-screen w-screen md:flex justify-center items-center p-2">
        {mediaQuery ? (
          <img
            src={rectangle}
            alt="site background"
            className="absolute left-0 top-0 h-screen w-[53vw] z-[-10]"
          />
        ) : (
          <div className="absolute left-0 top-0 h-screen w-full bg-[#e45858] z-[-10]" />
        )}
        <div className="w-full md:w-1/2 h-screen flex items-center justify-center">
          <Pomodoro selectedTask={state.selectedTask} />
          {mediaQuery && (
            <span className="text-white text-3xl font-extralight right-[52%] bottom-[1%] absolute">
              Designed by
            </span>
          )}
        </div>
        <div className="w-full md:w-1/2 h-screen flex md:items-center justify-center pt-4">
          <TaskList tasks={state.tasks} />
          {mediaQuery && (
            <span className="text-3xl font-extralight left-[51%] bottom-[1%] absolute">
              Sebastian Pardo
            </span>
          )}
        </div>
        {!mediaQuery && (
          <div className="w-full flex justify-center pt-4">
            <span className="text-[#e45858] mr-2">Designed by</span>
            Sebastian Pardo
          </div>
        )}
      </div>
    </ReducerContext.Provider>
  );
}

export default App;
