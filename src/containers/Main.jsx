import React, {useRef, useState} from 'react';
import {Field, Footer, Header, History} from '../components';
import beautify from 'js-beautify';
import useLocalStorage from '../hooks/useLocalStorage';
import {useEffect} from 'react';

const Main = () => {
  const [requestValue, setRequestValue] = useLocalStorage();
  const [width, setWidth] = useState(100);
  const [X, setX] = useState(0);
  const [ch, setCh] = useState(false);

  const format = () => {
    console.log('format');
    console.log(beautify(requestValue));
    setRequestValue(beautify(requestValue));
  };

  function setInitialX(e) {
    setCh(true);
    setX(e.clientX);
  }

  function resize(e) {
    if (ch) {
      // console.log('resize');

      const x = e.clientX;
      // console.log('x', x);

      setX(x);
      const delta = x - X;
      setWidth(width => width + delta);

      // if (x < X) {
      //   const delta = X - x
      //   setX(x)
      //   console.log('delta', delta)
      //   setWidth(width => width-delta );
      // } else {
      //   const delta = x - X
      //   setX(x)

      //   console.log('delta', delta)

      //   setWidth(width => width+delta);
      // }
    }
    // }
  }

  function onclick(e) {
    console.log(e.clientX);
  }

  return (
    <div>
      <Header />
      <History />
      <div className="main__fields" onClick={onclick} onMouseMove={resize}>
        <Field
          value={requestValue}
          onChange={setRequestValue}
          format={format}
          width={`${width}px`}
          classss={'request'}
        />
        <div className="resizer" onMouseDown={setInitialX} onMouseUp={() => setCh(false)}>
          :
        </div>

        <Field
          value={requestValue}
          onChange={setRequestValue}
          format={format}
          // width={`100%`}
          classss={'response'}
          readOnly={true}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
