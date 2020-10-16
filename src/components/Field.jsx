import React from 'react';
import classNames from 'classnames'

import {Controlled as Editor} from 'react-codemirror2';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/lint/json-lint'

const Field = props => {
  const {value, onChange, width, readOnly, autoFocus, cursorBlinkRate, labelValue, isValid} = props;

  const handleChange = (editor, data, value) => {
    onChange(value);
  };

  return (

      <div className={classNames('field', {'--invalid': !isValid})} style={{width: `${width}%`}}>
      <label>{labelValue}</label>
        <Editor
          value={value}
          onBeforeChange={handleChange}
          options={{
            mode: 'json',
            lint: true,
            tabSize: 4,
            readOnly,
            cursorBlinkRate,
            autofocus: autoFocus,
            lineWrapping: true,
            lineNumbers: false,
            autoCloseBrackets: true,
            showTrailingSpace: true,
            autocorrect: true,
          }}
        />
      </div>
  );
};

export default Field;
