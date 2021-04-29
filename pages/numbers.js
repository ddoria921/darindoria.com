import { useState } from "react";
import useInterval from "../hooks/use-interval";
import AnimatingNumber from "../components/animating-number";

export default function Numbers() {
  // -- Up/Down Buttons -- //
  const [counter, setCounter] = useState(500);
  const increase = () => setCounter(counter + 1);
  const decrease = () => setCounter(counter - 1);

  // -- Simulate Trading Button -- //
  const [simulate, setSimulate] = useState(false);
  const toggleSimulate = () => setSimulate(!simulate);

  useInterval(
    () => {
      let delta = Math.random() * 200;

      if (Math.floor(delta) % 2 === 0) {
        delta = delta * -1;
      }

      console.log(`Increase by ${delta}`);
      setCounter(Math.max(counter + delta, 0));
    },
    simulate ? 1500 : null
  );

  return (
    <div className="mx-auto mt-12 w-56">
      <AnimatingNumber value={counter} />
      <div className="flex justify-evenly">
        <button className="bg-gray-400 px-4 py-2 rounded-md" onClick={decrease}>
          ⬇️
        </button>
        <button className="bg-gray-400 px-4 py-2 rounded-md" onClick={increase}>
          ⬆️
        </button>
      </div>
      ;
      <div className="flex justify-evenly mt-4">
        <label className="text-white">
          <input type="checkbox" checked={simulate} onChange={toggleSimulate} />
          <span className="pl-2">Simulate Trading</span>
        </label>
      </div>
      ;
    </div>
  );
}
