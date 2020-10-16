import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Field, Footer, Header, History} from '../components';
import useLocalStorage from '../hooks/useLocalStorage';
import {isJson, formatJson} from '../utils/jsonUtils'

import {clearHistory, loadHistoryFromLocalStorage, sendNewRequest} from '../store/actions/main';

const Main = () => {
  const [requestValue, setRequestValuel] = useState('');
  const [responseValue, setResponseValue] = useState('');
  const [isValidRequest, setIsValidRequest] = useState(true)
  const [isValidResponse, setIsValidResponse] = useState(true)
  
  const [savedWidth, setSavedWidth] = useLocalStorage('width', 50);

  const [width, setWidth] = useState();
  const [X, setX] = useState(0);
  const [isResizing, setIsResizing] = useState(false);
  const [pxInPercent, setPxInPercent] = useState(0);

  const dispatch = useDispatch();
  const {currentResponse, responseData, isLoading} = useSelector(({main}) => main);

  useEffect(() => {
    setWidth(savedWidth)
    dispatch(loadHistoryFromLocalStorage())
  }, []);

  useEffect(() => {
    if (currentResponse) {
      setIsValidResponse(currentResponse.isOk)
      const formatResponse = formatJson(currentResponse.response)
      setResponseValue(formatResponse)
    }
  }, [currentResponse])

  function sendRequestHandler() {
    if (isJson(requestValue)) {
      setIsValidRequest(true)
      const request = JSON.parse(requestValue);
      dispatch(sendNewRequest(request));
    } else {
      setIsValidRequest(false)
    }
  }

  function onClickRequestHandler(id) {
    pasteRequest(id)
  }

  function onClearHistory() {
    dispatch(clearHistory())
  }

  function pasteRequest(id) {
    const requestValue = responseData.find(res => res.id === id).requestValue
    setRequestValuel(formatJson(requestValue))
  }

  function formatHandler() {
    if (isJson(requestValue)) {
      setIsValidRequest(true)
      setRequestValuel(formatJson(requestValue))
    } else {
      setIsValidRequest(false)
    }
  };

  function initialResize(e) {
    setIsResizing(true);
    setX(e.clientX);
    const docWidth = document.documentElement.scrollWidth - 40
    setPxInPercent(docWidth / 100);
  }

  function stopResize() {
    if (isResizing) {
      setIsResizing(false);
      setSavedWidth(width);
    }
  }

  function resize(e) {
    if (isResizing) {
      const currentX = e.clientX;
      setX(currentX);
      const delta = (currentX - X) / pxInPercent;
      setWidth(width => width + delta);
    }
  }

  return (
    <div className='main' >
      <Header />
      <History 
        responseData={responseData} 
        onClearHistory={onClearHistory} 
        onClickRequestHandler={onClickRequestHandler}
        pasteRequest={pasteRequest}/>
      <div
        className="main__fields"
        onClick={onclick}
        onMouseUp={stopResize}
        onMouseMove={resize}
      >
        <Field
          value={requestValue}
          isValid={isValidRequest}
          labelValue={'Запрос:'}
          onChange={setRequestValuel}
          width={width}
          autoFocus={true}
          cursorBlinkRate={500}
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
          value={responseValue}
          isValid={isValidResponse}
          labelValue={'Ответ:'}
          width={100 - width}
          readOnly={true}
          cursorBlinkRate={-1}
        />
      </div>
      <Footer 
        isLoading={isLoading} 
        sendRequestHandler={sendRequestHandler} 
        formatHandler={formatHandler}/>
    </div>
  );
};

export default Main;
