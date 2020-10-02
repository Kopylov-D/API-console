import React from 'react';
import classNames from 'classnames';
import Loader from './Loader';

const Button = props => {
  let flag = false;
  return (
    <button className={classNames('button')} onClick={props.onClick} disabled={props.disabled}>
      {flag ? <Loader /> : props.children}
    </button>
  );
};

export default Button;
