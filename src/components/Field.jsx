import React, {Fragment, useEffect} from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2';

import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/trailingspace';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/monokai.css';

const Field = () => {
  // useEffect(() => {
  //   const editor = CodeMirror.fromTextArea(document.querySelector('.textarea'));
  // }, []);
  const textRef = React.useRef();
  useEffect(() => {}, []);

  // console.log(codemirror())
  return (
    <Fragment>
      <CodeMirror
        className="field"
        value="I ♥ react-codemirror2"
        options={{
          mode: 'javascript',
          tabSize: 2,
          sizerWidth: '100px',
          autofocus: true,
          autoCloseBrackets: true,
          showTrailingSpace: true,

          // readOnly: true

          // theme: 'monokai',
          // lineNumbers: true
        }}
        display={
          {
            // blinker: 29
          }
        }
        // options={{
        // mode: 'xml',
        // theme: 'material',
        // lineNumbers: true,
        // }}
        onChange={(editor, data, value) => {
          console.log(editor);
        }}
      />
      {/* <div ref={textRef} className="field">
        <label htmlFor={'label'}>Запрос:</label>

        {/* <div> */}
      {/* <textarea  className="textarea"></textarea> */}
      {/* </div> */}
    </Fragment>
  );
};

export default Field;
