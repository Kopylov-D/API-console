import React from 'react';
import {Request} from './';

const History = ({responseData, onClearHistory, onClickRequestHandler, pasteRequest}) => {

  return (
    <div className="main__history">
      <div className="main__request-data">
        {responseData.map(response => {
        return(
        <Request 
          key={response.id} 
          isOk={response.isOk} 
          action={response.action} 
          id={response.id} 
          isOpenDropdown={response.isOpenDropdown}
          onClickRequestHandler={onClickRequestHandler} 
          pasteRequest={pasteRequest}/>)
        })}

      </div>
      <button className="main__close-btn" onClick={onClearHistory}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L19 19" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round"/>
          <path d="M19 1L1 19" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      <div className="gradient"></div>
    </div>
  );
};

export default History;
