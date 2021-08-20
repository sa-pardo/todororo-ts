import { AppState, ITask } from "../state";

export interface TaskReducerAction {
  type: "toggle" | "add" | "delete" | "select";
  task: ITask;
}

function tasksReducer(state: AppState, action: TaskReducerAction): AppState {
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

export default tasksReducer;
