import { useState } from 'react';
import cssStyle from './App.module.css';
import scssStyle from './Style.module.scss';
import { Link, Outlet } from 'react-router-dom';
const App = () => {
  const [number, setNumber] = useState<number>(0);
  return (
    <div>
      <Link to={'/'}>Main</Link>
      <br />
      <Link to={'/about'}>About</Link>
      <br />
      <Link to={'/shop'}>Shop</Link>
      <br />
      <h2 className={cssStyle.value}>{number}</h2>
      <button
        className={cssStyle.cssButton}
        onClick={() => setNumber((prev) => prev + 1)}
      >
        Increment <span>css</span>
      </button>
      <button
        className={scssStyle.scssButton}
        onClick={() => setNumber((prev) => prev - 1)}
      >
        Decrement <span>scss</span>
      </button>

      <Outlet />
    </div>
  );
};

export default App;
