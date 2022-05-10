import React, { useEffect, useReducer } from "react";
import { FaGithub } from "react-icons/fa";
import TaskList from "./components/TaskList";
import Pomodoro from "./components/Pomodoro";
import rectangle from "./assets/Rectangle.png";
import useMediaQuery from "./hooks/MediaQuery";
import ReducerContext from "./context/ReducerContext";
import { AppState } from "./state";
import tasksReducer from "./reducers/tasksReducer";

const stored = localStorage.getItem("state");
const initialState: AppState = stored
  ? JSON.parse(stored)
  : {
      tasks: [],
      selectedTask: null,
    };

function App() {
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  const mediaQuery = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

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
