import React, {Fragment, useEffect, useState} from 'react';
import classNames from 'classnames'
import { useSelector, useDispatch } from 'react-redux';
import { togglePopup } from '../store/actions/main';

const Request = ({isOk, action}) => {
  const copy = false;
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [wrong, setWrong] = useState(true);

  const {isOpenPopup} = useSelector(({main}) => main)
  const dispatch = useDispatch()
  console.log(isOpenPopup)

  // useEffect (() => {
  //   setPopupIsOpen(isOpenPopup)
  // }, [])

  const toggle = () => {
    // setPopupIsOpen(!popupIsOpen);
    dispatch(togglePopup())
  };

  return (
    <div className={classNames('request', {'wrong': !isOk})}>
      <div className="request__content">
        <div className='request__indicator'></div>
        <div>
          {copy ? (
            <span className="request__action">Скопировано</span>
          ) : (
          <span>{action}</span>
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

      {isOpenPopup ? (
        <Fragment>
          {/* <div className="backdrop" onClick={togglePopup}></div> */}
          {/* <div className="dropdown"> */}
            <ul className="dropdown__content">
              <li>Выполнить</li>
              <li>Скопировать</li>
              <div></div>
              <li>Удалить</li>
            </ul>
          {/* </div> */}
        </Fragment>
      ) : null}
    </div>
  );
};

export default Request;
