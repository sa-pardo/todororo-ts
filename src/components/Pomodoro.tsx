import React, { ReactElement, useEffect, useReducer } from "react";
import { FiPause, FiPlay } from "react-icons/fi";
import Task from "./Task";
import TimerWorker from "../worker?worker";
import styles from "./Pomodoro.module.css";
import notificationSound from "../assets/notification.wav";
import icon from "../assets/favicon.ico";
import { ITask, PomodoroState } from "../state";
import pomodoroReducer from "../reducers/pomodoroReducer";

const timerWorker = new TimerWorker();

interface Props {
  selectedTask: ITask | null;
}

const formatTime = (time: number): string => {
  let minutes: string = Math.trunc(time / 60).toString();
  minutes = minutes.length < 2 ? `0${minutes}` : minutes;
  let seconds: string = (time - Math.trunc(time / 60) * 60).toString();
  seconds = seconds.length < 2 ? `0${seconds}` : seconds;

  return `${minutes}:${seconds}`;
};

const initialState: PomodoroState = {
  time: 1500,
  type: "work",
  isPlaying: false,
};

function notifyEndedSession(sessionType: "work" | "break") {
  // eslint-disable-next-line no-new
  new Notification("Tododoro", {
    body: `Your ${sessionType} session has ended`,
    icon,
    tag: "waeonao",
    silent: true,
  });
  const audio = document.getElementById("notification") as HTMLMediaElement;
  audio.play();
  audio.addEventListener(
    "ended",
    () => {
      audio.currentTime = 0;
      audio.play();
    },
    { once: true }
  );
}

function Pomodoro({ selectedTask }: Props): ReactElement {
  const [state, dispatch] = useReducer(pomodoroReducer, initialState);

  const toggleTimer = () => {
    dispatch({ type: "toggle" });
    if (state.isPlaying) {
      timerWorker.postMessage({ type: "stop" });
    } else {
      timerWorker.postMessage({ type: "start", time: state.time });
    }
  };

  useEffect(() => {
    timerWorker.onmessage = (message) => {
      if (message.data !== 0) {
        dispatch({ type: "set", data: message.data });
      } else {
        dispatch({ type: "set", data: 0 });
        timerWorker.postMessage({ type: "stop" });
      }
    };
  }, []);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    if (state.time !== 0) {
      if (state.isPlaying) {
        document.title = `${formatTime(state.time)} Tododoro`;
      }
    } else {
      document.title = "Tododoro";
      notifyEndedSession(state.type);
      setTimeout(() => {
        dispatch({ type: "switch" });
      }, 1000);
    }
  }, [state.time, state.type, state.isPlaying]);

  return (
    <div className="border-white border rounded-3xl p-8 w-full max-w-md">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio id="notification">
        <source src={notificationSound} />
      </audio>
      <h2 className="font-semibold text-3xl text-white mb-5">Pomodoro</h2>
      <p
        className="mb-5 text-white text-9xl text-center underline font-thin "
        style={{ textDecorationThickness: 4, textUnderlineOffset: 5 }}
      >
        {formatTime(state.time)}
      </p>
      <div className="flex justify-center">
        <div
          onClick={() => toggleTimer()}
          onKeyPress={() => toggleTimer()}
          role="button"
          tabIndex={0}
        >
          {state.isPlaying ? (
            <FiPause
              key="pause"
              className={`text-yellow-300 cursor-pointer w-20 h-16 stroke-1 ${styles["spin-one"]}`}
            />
          ) : (
            <FiPlay
              key="play"
              className={`text-green-500 cursor-pointer w-20 h-16 stroke-1 ${styles["spin-one"]}`}
            />
          )}
        </div>
      </div>
      <div
        onClickCapture={(event) => {
          event.stopPropagation();
        }}
      >
        {selectedTask ? (
          <Task task={selectedTask} readOnly />
        ) : (
          <div className="mt-5" />
        )}
      </div>
    </div>
  );
}

export default Pomodoro;
