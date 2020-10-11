import React from 'react';
import {Controlled as Editor} from 'react-codemirror2';
import classNames from 'classnames'

import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/edit/closebrackets';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/lint/json-lint'

const Field = props => {
  const {value, onChange, width, readOnly, autoFocus, labelValue, isValidRequest} = props;

  const handleChange = (editor, data, value) => {
    onChange(value);
  };

  return (

      <div className={classNames('field', {'--invalid': !isValidRequest})} style={{width: `${width}%`}}>
      <label>{labelValue}</label>
        <Editor
          value={value}
          onBeforeChange={handleChange}
          options={{
            mode: 'json',
            lint: true,
            tabSize: 4,
            lineWrapping: true,
            lineNumbers: false,
            autofocus: autoFocus,
            autoCloseBrackets: true,
            showTrailingSpace: true,
            autocorrect: true,
            // fixedGutter: false,
            // viewportMargin: 100,

            // sizerWidth: '100px',
            readOnly,

            // theme: 'monokai',
            // lineNumbers: true
          }}
          editorDidMount={editor => {
            // editor.setSize(width);
          }}
          onUpdate={(editor, event) => {}}
          onGutterClick={(editor, lineNumber, gutter, event) => {
            // console.log(editor)
          }}
        />
      </div>
  );
};

export default Field;
