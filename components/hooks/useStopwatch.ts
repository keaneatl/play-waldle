import { useState, useEffect } from "react";

export const useStopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timer | undefined = undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((seconds) => seconds + 1);
      }, 1000);
    } else if (!isRunning && elapsed !== 0 && interval) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [elapsed, isRunning]);

  return [elapsed, setIsRunning];
};
