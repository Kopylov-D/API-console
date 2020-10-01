import React from 'react';

const Request = () => {
  const action = false;
  return (
    <div className="request">
      <div className="request__content">
        <div className="request__indicator"></div>
        <div>
          {action ? (
            <span className="request__action">Скопировано</span>
          ) : (
            <span>send</span>
          )}
        </div>
        <button>
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

      <div className="dropdown">
        <ul className="dropdown__content">
          <li>Выполнить</li>
          <li>Скопировать</li>
          <div></div>
          <li>Удалить</li>
        </ul>
      </div>
    </div>
  );
};

export default Request;
