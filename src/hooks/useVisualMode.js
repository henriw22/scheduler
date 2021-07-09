import { useState } from "react";

export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // useEffect(() => {
  //   setMode(history[history.length - 1]);
  // }, [history])

  function transition(newMode, replace = false)  {
    const newHistory = replace ? history.slice(0, -1) : history;
    setHistory([...newHistory, newMode]);
    // setMode(newMode);
  }

  function back () {
    if (history.length > 1) {
      setHistory([...history.slice(0, -1)]);
    }
  } 

  const mode = history.slice(-1)[0];
  return { mode, transition, back };
}