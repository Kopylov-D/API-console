import React from 'react';
import {Button} from './UI';

import formatIcon from '../assets/img/format-icon.svg';

const Footer = () => {
  return (
    <footer className="main__footer">
      <Button>Отправить</Button>
      <div>@link-to-your-github</div>
      <button className="format-btn">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.8">
            <path
              d="M21 10H7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11 6H3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 14H7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 18H3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
        <span>Форматировать</span>
      </button>
    </footer>
  );
};

export default Footer;
