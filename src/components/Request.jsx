import React, {Fragment, useState} from 'react';
import classNames from 'classnames'
import { useDispatch } from 'react-redux';

import { deleteResponse, sendRequestFromHistory, copyResponse, togglePopup } from '../store/actions/main';

const Request = ({id, isOk, action, isOpenDropdown, onClickRequestHandler, pasteRequest}) => {
  const [copy, setCopy] = useState(false);

  const dispatch = useDispatch()


  const runResponseHandler = () => {
    dispatch(sendRequestFromHistory(id)) 
    pasteRequest(id)
    toggleDropdown()
  }

  const deleteResponseHandler = () => {
    dispatch(deleteResponse(id))
    toggleDropdown()
  }

  const copyResponseHandler = () => {
    dispatch(copyResponse(id))
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 1950)
    toggleDropdown()
  }

  const toggleDropdown = () => {
    dispatch(togglePopup(!isOpenDropdown, id))
  };

  // const style = {
    // position: copy ? 'absolute' : 'static',
    // left: '30px'
    // minWidth: copy ? '75px' : null
  // }

  return (
    <div className={classNames('request', {'wrong': !isOk})}>
      <div className="request__content">
        <div onClick={() => setCopy(copy => !copy)} className='request__indicator'></div>

          <div className={classNames("request__copy", {'dnone': !copy})}>Скопировано</div>
          <div className="request__action"  onClick={() => onClickRequestHandler(id)}>{action}</div>  
          
        <button onClick={toggleDropdown}>
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

      {isOpenDropdown ? (
        <Fragment>
          <div className={classNames("backdrop", {'dblock': isOpenDropdown})}  onClick={toggleDropdown}></div>
            <ul className="dropdown__content">
              <li onClick={runResponseHandler}>Выполнить</li>
              <li onClick={copyResponseHandler}>Скопировать</li>
              <div></div>
              <li onClick={deleteResponseHandler}>Удалить</li>
            </ul>
        </Fragment>
      ) : null}
    </div>
  );
};

export default Request;
