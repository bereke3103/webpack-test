import { useState } from 'react';
import cssStyle from './App.module.css';
import scssStyle from './Style.module.scss';
import { Link, Outlet } from 'react-router-dom';
import About from '@/pages/allPages/about/About';
import pngPic from '@/assets/pic-png.png';
import jpgPic from '@/assets/pic-jpeg.jpg';
import SvgComponent from '@/assets/pic-svg.svg';

//Tree shaking
// ЕСЛИ КОД НЕ ИСПОЛЬЗУЕТСЯ, ТО В СБОРКУ НЕ ВОЙДЕТ
//lazy loading + Декомпозиция
function TODO(a: number) {
  return a;
}
const App = () => {
  const [number, setNumber] = useState<number>(0);

  // if (__PLATFORM__ === 'desktop') {
  //   return <div>IS DESKTOP PLATFORM</div>;
  // }

  if (__PLATFORM__ === 'mobile') {
    return <div>IS MOBILE PLATFORM</div>;
  }

  if (__ENV__ === 'development') {
    //addDevtools
  }

  // TODO('5');
  TODO(5);

  return (
    <>
      <div className="className-data-test" data-testId="test-id-for-dev">
        <h1>PLATFORM: {__PLATFORM__}</h1>
        <img src={pngPic} width={100} alt="pngPic" />
        <img src={jpgPic} width={100} alt="jpgPic" />
        {/* <img src={svgPic} width={100} alt="svgPic" /> */}

        <div data-testId="test-id-for-dev">
          {/* протипизировали SVF */}
          <SvgComponent
            fill={'green'}
            style={{ border: '5px solid green', color: 'blue' }}
            width={100}
            height={100}
          />
        </div>
      </div>
      <div data-testId="test-id-for-dev">
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
        <p>Text new</p>
        <p>Text new</p>
        <p>Text new</p>
        <p>Text new</p>
        <p>Text new</p>
        <p>Text new</p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam delectus
        repudiandae libero exercitationem labore eligendi provident aspernatur
        fugit eaque quae nihil cum, iure blanditiis at corporis sit itaque
        perspiciatis ullam.
        <input type="text" />
        <About />
        <Outlet />
      </div>
    </>
  );
};

export default App;
