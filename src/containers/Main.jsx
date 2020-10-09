import React, {useState} from 'react';
import {Field, Footer, Header, History} from '../components';
import beautify from 'js-beautify';
import useLocalStorage from '../hooks/useLocalStorage';
import {useDispatch, useSelector} from 'react-redux';
import {sendRequest} from '../store/actions/main';
import {useEffect} from 'react';

const Main = () => {
  const [requestValue, setRequestValue] = useLocalStorage();
  const [reqVal, setReqVal] = useState('');
  const [savedWidth, setSavedWidth] = useLocalStorage('width', 45);
  const [width, setWidth] = useState(50);
  const [X, setX] = useState(0);
  const [ch, setCh] = useState(false);
  const [perc, setPerc] = useState(0);

  const dispatch = useDispatch();
  const {responseValue} = useSelector(({main}) => main);

  useEffect(() => {
    setWidth(savedWidth)
  }, []);

  let res = JSON.stringify(responseValue);
  res = beautify(res)

  function sendRequestHandler() {
    // console.log(typeof requestValue)
    // let req = JSON.parse(requestValue)
    let req = reqVal;
    // console.log(typeof req);
    req = JSON.parse(req);
    // console.log(typeof req);

    // let rrrrrr = JSON.parse(reqVal)
    // console.log(typeof rrrrrr)

    // dispatch(sendRequest(JSON.parse(requestValue)))
    dispatch(sendRequest(req));
  }

  const format = () => {
    console.log('format');
    console.log(beautify(requestValue));
    setRequestValue(beautify(requestValue));
  };

  function setInitialX(e) {
    setCh(true);
    setX(e.clientX);
    const docWidth = document.documentElement.clientWidth - 40;
    setPerc(docWidth / 100);
  }

  function resize(e) {
    if (ch) {
      const x = e.clientX;
      setX(x);
      const delta = (x - X) / perc;
      setWidth(width => width + delta);
    }
  }

  function onclick(e) {
    // console.log(e.clientX);
  }

  return (
    <div onMouseLeave={() => setCh(false)}>
      <Header />
      <History />
      <div
        className="main__fields"
        onClick={onclick}
        onMouseMove={resize}
        onMouseUp={() => {
          setCh(false);
          setSavedWidth(width);
        }}
      >
        <Field
          value={reqVal}
          onChange={setReqVal}
          format={format}
          width={width}

        />

        <div className="resizer" onMouseDown={setInitialX}>
          <svg
            width="4"
            height="18"
            viewBox="0 0 4 18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2" cy="2" r="2" />
            <circle cx="2" cy="9" r="2" />
            <circle cx="2" cy="16" r="2" />
          </svg>
        </div>

        <Field
          value={res}
          width={100 - width}
          // onChange={setReqVal}
          format={format}

          readOnly={true}
        />
      </div>
      <Footer sendRequestHandler={sendRequestHandler} />
    </div>
  );
};

export default Main;
