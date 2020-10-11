import React, {useState} from 'react';
import {Field, Footer, Header, History} from '../components';
import beautify from 'js-beautify';
import useLocalStorage from '../hooks/useLocalStorage';
import {useDispatch, useSelector} from 'react-redux';
import {loadHistoryFromLocalStorage, sendRequest} from '../store/actions/main';
import {useEffect} from 'react';
import {isJson, formatJson} from '../utils/jsonUtils'

const Main = () => {
  const [reqVal, setReqVal] = useState('');
  const [resVal, setResVal] = useState('');
  const [isValidRequest, setIsValidRequest] = useState(true)
  
  const [savedWidth, setSavedWidth] = useLocalStorage('width', 50);
  // const [savedHistory, setSavedHistory] = useLocalStorage('response-data', [])

  const [width, setWidth] = useState();
  const [X, setX] = useState(0);
  const [ch, setCh] = useState(false);
  const [perc, setPerc] = useState(0);

  const dispatch = useDispatch();
  const {currentResponse, responseData, isLoading} = useSelector(({main}) => main);

  useEffect(() => {
    setWidth(savedWidth)
    dispatch(loadHistoryFromLocalStorage())
  }, []);

  useEffect(() => {
      const formatResponse = formatJson(currentResponse)
      setResVal(formatResponse)
      // if (responseData.length > 0) {
      //   setSavedHistory(responseData)
      // }
      // console.log(savedHistory)
  }, [currentResponse])

  function sendRequestHandler() {
    if (isJson(reqVal)) {
      setIsValidRequest(true)
      const req = JSON.parse(reqVal);
      dispatch(sendRequest(req));
    } else {
      setIsValidRequest(false)
    }
  }

  function showResponseHandler() {

  }

  const formatHandler = () => {
    if (isJson(reqVal)) {
      setIsValidRequest(true)
      setReqVal(formatJson(reqVal))
    } else {
      setIsValidRequest(false)
    }
  };

  function initialResize(e) {
    setCh(true);
    setX(e.clientX);
    // const docWidth = document.documentElement.clientWidth - 40;
    // const windowWidth = window.innerWidth - 40
    const docWidth = document.documentElement.scrollWidth - 40

    setPerc(docWidth / 100);
  }

  function stopResize() {
    if (ch) {
      setCh(false);
      console.log('stop')
      setSavedWidth(width);
    }
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
    <div className='main' onMouseLeave={() => setCh(false)}>
      <Header />
      <History responseData={responseData}/>
      <div
        className="main__fields"
        onClick={onclick}
        onMouseUp={stopResize}
        onMouseMove={resize}
      >
        <Field
          value={reqVal}
          isValidRequest={isValidRequest}
          labelValue={'Запрос:'}
          onChange={setReqVal}
          width={width}
          autoFocus={true}
        />

        <div className="resizer" onMouseDown={initialResize} >

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
          value={resVal}
          width={100 - width}
          labelValue={'Ответ:'}
          readOnly={true}
          isValidRequest={isValidRequest}
        />
      </div>
      <Footer isLoading={isLoading} sendRequestHandler={sendRequestHandler} formatHandler={formatHandler}/>
    </div>
  );
};

export default Main;
