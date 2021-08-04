import React from "react";
// eslint-disable-next-line import/no-cycle
import { ReducerActions } from "./App";

const ReducerContext = React.createContext(
  {} as React.Dispatch<ReducerActions>
);
export default ReducerContext;
