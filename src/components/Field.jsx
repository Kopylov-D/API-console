import React, {Fragment} from 'react';
import {Controlled as Editor} from 'react-codemirror2';
import classNames from 'classnames';

import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/edit/closebrackets';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';

const Field = props => {
  const {value, onChange, format, width, readOnly} = props;

  const handleChange = (editor, data, value) => {
    onChange(value);
  };

  return (
    <Fragment>
      <div className='field' style={{width: `${width}%`}}>
        <label>Запрос</label>
        <Editor
          value={value}
          onBeforeChange={handleChange}
          options={{
            mode: 'json',
            lint: true,
            tabSize: 4,
            lineWrapping: true,
            lineNumbers: false,
            // autofocus: true,
            autoCloseBrackets: true,
            showTrailingSpace: true,
            autocorrect: true,
            fixedGutter: false,
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
    </Fragment>
  );
};

export default Field;
