import React, {useRef, useState} from 'react';
import {Field, Footer, Header, History} from '../components';
import beautify from 'js-beautify';
import useLocalStorage from '../hooks/useLocalStorage';
import {useEffect} from 'react';

const Main = () => {
  const [requestValue, setRequestValue] = useLocalStorage();
  const [width, setWidth] = useState(550);
  const [X, setX] = useState(0);
  const [ch, setCh] = useState(false);

  const elemRef = useRef ();

  const format = () => {
    console.log('format');
    console.log(beautify(requestValue));
    setRequestValue(beautify(requestValue));
  };

  // useEffect(() => {}, []);

  function setInitialX(e) {
    setCh(true);
    setX(e.pageX);
  }

  function cols(e) {
    // const wid = document.clientX;
    // const w = e.pageX;
    // console.log(w);
    // console.log(wid);
  }

  function resize(e) {
    if (ch) {
      const x = e.pageX
      // console.log('move');
      if (x < X) {
        console.log('epage-')
        setWidth(width => width-X+x);
      } else {
        console.log('epage++')

        setWidth(width => width+x-X);
      }
    }
    // }
  }

  // function stopResize(e) {
  //   window.removeEventListener('mousemove', Resize, false);
  //   window.removeEventListener('mouseup', stopResize, false);
  // }

  // const initResize = () => {
  //   window.addEventListener('mousemove', Resize, false);
  //   window.addEventListener('mouseup', stopResize, false);
  // };

  function onclick(e) {
    console.log(e.pageX)
  }

  return (
    <div>
      <Header />
      <History />
      <div
        ref={elemRef}
        
        className="main__fields"
        onMouseDown={setInitialX}
        onMouseUp={() => setCh(false)}
        onMouseMove={resize}
        // onClick={onclick}
        // onMouseMove={resize}
      >
        <Field
          value={requestValue}
          onChange={setRequestValue}
          format={format}
          width={`${width}px`}
          classss={'request'}
        />
        <div
          className="resizer"
          onMouseDown={resize}
          // onClick={() => setWidth(500)}
          // onMouseMove={event => {

          // }}
        >
          {/* {ch ? <div onMouseMove={() => console.log('move')}>:</div> : null} */}
        </div>

        <Field
          value={requestValue}
          onChange={setRequestValue}
          format={format}
          width={`${60}%`}
          classss={'response'}
          readOnly={true}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
