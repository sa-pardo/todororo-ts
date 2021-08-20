import React from "react";
import { TaskReducerAction } from "../reducers/tasksReducer";

const ReducerContext = React.createContext(
  null as unknown as React.Dispatch<TaskReducerAction>
);

export default ReducerContext;
