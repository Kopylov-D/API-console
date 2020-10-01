import React from 'react';
import classnames from 'classnames';

const Input = props => {
  const inputType = props.type || 'text';
  const htmlFor = `${inputType}-${Math.random()}`;

  return (
    <div className={classnames('input', {'--invalid': props.invalid})}>
      <div>
        <label htmlFor={htmlFor}>
          <span>{props.label}</span>
          <span>{props.optionalLabel}</span>
        </label>
      </div>

      <input
        id={htmlFor}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default Input;
