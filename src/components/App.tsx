import { useState } from 'react';
import './app.css';
import './style.scss';
const App = () => {
  const [number, setNumber] = useState<number>(0);
  return (
    <div>
      <h2>{number}</h2>
      <button
        className="css-button"
        onClick={() => setNumber((prev) => prev + 1)}
      >
        Increment <span>css</span>
      </button>
      <button
        className="scss-button"
        onClick={() => setNumber((prev) => prev - 1)}
      >
        Decrement <span>scss</span>
      </button>
    </div>
  );
};

export default App;
