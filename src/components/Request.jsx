import React, {Fragment, useEffect, useState} from 'react';
import classNames from 'classnames'
import { useSelector, useDispatch } from 'react-redux';
import { deleteResponse, sendRequestFromHistory, togglePopup } from '../store/actions/main';

const Request = ({id, isOk, action, onClickResponseHandler}) => {
  const copy = false;
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [wrong, setWrong] = useState(true);

  const {isOpenPopup} = useSelector(({main}) => main)
  const dispatch = useDispatch()

  // useEffect (() => {
  //   setPopupIsOpen(isOpenPopup)
  // }, [])

  const runHandler = () => {
   dispatch(sendRequestFromHistory(id)) 
   setPopupIsOpen(!popupIsOpen);
  }

  const deleteResponseHandler = () => {
    dispatch(deleteResponse(id))
    setPopupIsOpen(!popupIsOpen);
  }

//  const onClickResponseHandler = () => {
//   onClickResponseHandler()
//  }

  const toggle = () => {
    setPopupIsOpen(!popupIsOpen);
    // dispatch(togglePopup())
  };

  return (
    <div className={classNames('request', {'wrong': !isOk})}>
      <div className="request__content">
        <div className='request__indicator'></div>
        <div>
          
          {copy ? (
            <span className="request__action">Скопировано</span>
          ) : (
          <span onClick={() => onClickResponseHandler(id)}>{action}</span>
          )}
        </div>
        <button onClick={toggle}>
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
        </button>
      </div>

      {popupIsOpen ? (
        <Fragment>
          {/* <div className="backdrop" onClick={togglePopup}></div> */}
          {/* <div className="dropdown"> */}
            <ul className="dropdown__content">
              <li onClick={runHandler}>Выполнить</li>
              <li>Скопировать</li>
              <div></div>
              <li onClick={deleteResponseHandler}>Удалить</li>
            </ul>
          {/* </div> */}
        </Fragment>
      ) : null}
    </div>
  );
};

export default Request;
