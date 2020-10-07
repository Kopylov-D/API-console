import React, {Fragment, useEffect} from 'react';
import {Controlled as Editor} from 'react-codemirror2';

import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/edit/closebrackets';
// import 'codemirror/addon/edit/trailingspace';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';

import {Button} from './UI';

const Field = props => {
  const {value, onChange, format} = props;
  // useEffect(() => {
  //   const editor = CodeMirror.fromTextArea(document.querySelector('.textarea'));
  // }, []);
  // const textRef = React.useRef();
  // useEffect(() => {}, []);

  // console.log(codemirror())

  const handleChange = (editor, data, value) => {
    // editor.showTrailingSpace()
    onChange(value);
  };
  return (
    <Fragment>
      <Editor
        className="field"
        value={value}
        onBeforeChange={handleChange}
        options={{
          mode: 'javascript',
          lint: true,
          tabSize: 2,
          lineWrapping: true,
          autofocus: true,
          autoCloseBrackets: true,
          showTrailingSpace: true,
          autocorrect: true,
          // viewportMargin: 100,

          // sizerWidth: '100px',
          // readOnly: true

          // theme: 'monokai',
          // lineNumbers: true
        }}
        display={{}}
        // options={{
        // mode: 'xml',
        // theme: 'material',
        // lineNumbers: true,
        // }}
        // onChange={(editor, data, value) => {
        //   console.log(editor.display.barHeight);
        //   console.log(beautify(value));
          // editor.execCommand(selectAll)
        // }}
        // execCommand={selectAll}
      />
      {/* <div ref={textRef} className="field">
        <label htmlFor={'label'}>Запрос:</label>

        {/* <div> */}
      {/* <textarea  className="textarea"></textarea> */}
      {/* </div> */}
      <Button onClick={format}>FormatTest</Button>
    </Fragment>
  );
};

export default Field;
