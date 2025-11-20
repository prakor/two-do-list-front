import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "@store/slices/counterSlice";

const inbox = () => {
  const count = useSelector((state) => state.counter.value);
  const test = useSelector((state) => state.counter.test);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Inbox Page</h1>
      <h2>{count}</h2>
      <h2>{test}</h2>

      <button
        className="w-full bg-amber-500 text-white py-2 rounded-lg text-lg font-bold hover:bg-amber-600"
        onClick={() => dispatch(increment())}
      >
        +
      </button>
      <br />
      <br />
      <button
        className="w-full bg-amber-500 text-white py-2 rounded-lg text-lg font-bold hover:bg-amber-600"
        onClick={() => dispatch(decrement())}
      >
        -
      </button>
      <br />
      <br />
      <button
        className="w-full bg-amber-500 text-white py-2 rounded-lg text-lg font-bold hover:bg-amber-600"
        onClick={() => dispatch(incrementByAmount(100))}
      >
        Set 100
      </button>
    </div>
  );
};

export default inbox;
