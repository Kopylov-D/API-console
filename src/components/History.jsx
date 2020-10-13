import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Request} from './';

import closeBtn from '../assets/img/close-btn.svg';
import useLocalStorage from '../hooks/useLocalStorage';
import { loadHistoryFromLocalStorage } from '../store/actions/main';


const History = ({responseData, onClearHistory, onClickResponseHandler}) => {

  // const [savedHistory, setSavedHistory] = useLocalStorage('response-data', [])

  // const {responseData} = useSelector(({main}) => main)
  // const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(loadHistoryFromLocalStorage(savedHistory))
  }, [])

// console.log('responseData', responseData)

  // useEffect(() => {
  //   console.log('changed')
  //   console.log(responseData)

  //     if (responseData.length > 0) {
  //       setSavedHistory(responseData)
  //     }
  // })

  return (
    <div className="main__history">
      <div className="main__request-data">
        {responseData.map(response => {
        return(<Request key={response.id} isOk={response.isOk} action={response.action} id={response.id} onClickResponseHandler={onClickResponseHandler}/>)
        })}

      </div>
      <button className="main__close-btn" onClick={onClearHistory}>
        <img src={closeBtn} alt="close-btn" />
      </button>
    </div>
  );
};

export default History;
