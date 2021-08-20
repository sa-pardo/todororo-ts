import { PomodoroState } from "../state";

interface PomodoroReducerAction {
  type: "set" | "toggle" | "switch";
  data?: number;
}

function pomodoroReducer(
  state: PomodoroState,
  action: PomodoroReducerAction
): PomodoroState {
  switch (action.type) {
    case "set":
      return { ...state, time: action.data! };
    case "toggle":
      return { ...state, isPlaying: !state.isPlaying };
    case "switch": {
      if (state.type === "work") {
        return { time: 300, type: "break", isPlaying: false };
      }
      return { time: 1500, type: "work", isPlaying: false };
    }
    default:
      return state;
  }
}

export default pomodoroReducer;
