import React from "react";
import { forwardRef } from "react";
import { createPortal } from "react-dom";

export const ResultModal = forwardRef(({ result, targetTime }, ref) => {
  const score = Math.round((1 - result.time / targetTime) * 100);
  return createPortal(
    <dialog className="result-modal" ref={ref}>
      <h2>you {result.result}</h2>
      {result.time >= 0 ? <h3>your score: {score}</h3> : null}
      <p>
        the target time was <strong>{targetTime} seconds.</strong>
      </p>
      {result.time >= 0 ? (
        <p>
          you stopped the timer with{" "}
          <strong>{result.time.toFixed(2)} seconds left.</strong>
        </p>
      ) : null}
      <form method="dialog">
        <button>close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});
