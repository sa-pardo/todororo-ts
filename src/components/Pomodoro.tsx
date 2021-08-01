import React, { ReactElement, useState, useEffect } from "react";
import { FiPause, FiPlay } from "react-icons/fi";
import Task, { ITask } from "./Task";
import TimerWorker from "../worker?worker";

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

function Pomodoro({ selectedTask }: Props): ReactElement {
  const [time, setTime] = useState(1501);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleTimer = () => {
    if (isPlaying) {
      setIsPlaying(!isPlaying);
      timerWorker.postMessage({ type: "stop" });
    } else {
      setIsPlaying(!isPlaying);
      timerWorker.postMessage({ type: "start", time });
    }
  };

  useEffect(() => {
    timerWorker.onmessage = (message) => {
      setTime(message.data);
    };
  }, []);

  return (
    <div className="border-white border rounded-3xl p-8 w-full max-w-md">
      <h2 className="font-semibold text-3xl text-white mb-5">Pomodoro</h2>
      <p
        className="mb-5 text-white text-9xl text-center underline font-thin "
        style={{ textDecorationThickness: 4, textUnderlineOffset: 5 }}
      >
        {formatTime(time)}
      </p>
      <div
        onClick={() => toggleTimer()}
        onKeyPress={() => toggleTimer()}
        role="button"
        tabIndex={0}
        className="flex justify-center"
      >
        {isPlaying ? (
          <FiPause className="text-yellow-300 cursor-pointer w-20 h-16 stroke-1" />
        ) : (
          <FiPlay className="text-green-500 cursor-pointer w-20 h-16 stroke-1" />
        )}
      </div>
      <div
        onClickCapture={(event) => {
          event.stopPropagation();
        }}
      >
        {selectedTask && <Task task={selectedTask} />}
      </div>
    </div>
  );
}

export default Pomodoro;
