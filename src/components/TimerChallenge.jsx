import React, { useRef, useState } from "react";
import { ResultModal } from "./ResultModal";

export const TimerChallenge = ({ title, targetTime }) => {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const [Gameresult, setGameResult] = useState({});

  let timer = useRef();
  const dialog = useRef();
  let time = useRef();

  function handleStart() {
    timer.current = setTimeout(() => {
      //   setTimerExpired(true);
      setGameResult({
        result: "lost",
      });
      setTimerStarted(false);
      dialog.current.showModal();
    }, targetTime * 1000);
    setTimerStarted(true);
    time.current = Date.now();
  }

  function handleStop() {
    clearTimeout(timer.current);
    dialog.current.showModal();
    setGameResult({
      result: "won",
      time: targetTime - (Date.now() - time.current) / 1000,
    });
    setTimerStarted(false);
  }
  return (
    <>
      <ResultModal ref={dialog} result={Gameresult} targetTime={targetTime} />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "stop" : "start"} challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : undefined}>
          {timerStarted ? "Time is running" : "Timer inactive"}
        </p>
      </section>
    </>
  );
};
