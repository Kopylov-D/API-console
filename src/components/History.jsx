import React from 'react';
import {Request} from './';

import closeBtn from '../assets/img/close-btn.svg';

const History = () => {
  return (
    <div className="main__history">
      <div>
        <Request />
        <Request />
        <Request />
      </div>
      <button className="main__close-btn">
        <img src={closeBtn} alt="close-btn" />
      </button>
    </div>
  );
};

export default History;
