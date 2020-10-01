import React from 'react';
import classNames from 'classnames'

import meh from '../assets/img/meh.png';

const Error = () => {
  return (
    <div className={classNames('error')}>
      <img alt="meh" src={meh} />
      <div>
        <div>Вход не вышел </div>
        <footer>id: "error/auth/failed", explain: "wrong_credentials"</footer>
      </div>
    </div>
  );
};

export default Error;
