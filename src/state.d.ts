export interface AppState {
  tasks: ITask[];
  selectedTask: ITask | null;
}

export interface ITask {
  id: string;
  title: string;
  isDone: boolean;
}

export interface PomodoroState {
  time: number;
  type: "work" | "break";
  isPlaying: boolean;
}
