import React, {Fragment, useState} from 'react';
import classNames from 'classnames'

const Request = () => {
  const action = false;
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [wrong, setWrong] = useState(true);

  const togglePopup = () => {
    setPopupIsOpen(!popupIsOpen);
  };

  return (
    <div className={classNames('request', {wrong})}>
      <div className="request__content">
        <div className='request__indicator'></div>
        <div>
          {action ? (
            <span className="request__action">Скопировано</span>
          ) : (
            <span>send</span>
          )}
        </div>
        <button onClick={togglePopup}>
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
          <div className="backdrop" onClick={togglePopup}></div>
          <div className="dropdown">
            <ul className="dropdown__content">
              <li>Выполнить</li>
              <li>Скопировать</li>
              <div></div>
              <li>Удалить</li>
            </ul>
          </div>
        </Fragment>
      ) : null}
    </div>
  );
};

export default Request;
