import * as React from "react";

function useInterval(callback, delay) {
  const savedCallback = React.useRef(null);
  const isPaused = React.useRef(false);

  let intervalId = null;
  let remaining = null;
  let start = null;

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const resume = () => {
    isPaused.current = false;

    start = new Date();
    intervalId = window.setTimeout(() => {
      remaining = delay;

      resume();
      savedCallback && savedCallback.current();
    }, remaining);
  };

  const pause = () => {
    isPaused.current = true;

    window.clearTimeout(intervalId);
    const diff = new Date() - start;
    remaining = remaining - diff;
  };

  return {
    pause,
    resume,
    isPaused: isPaused.current
  };
}

export default useInterval;
