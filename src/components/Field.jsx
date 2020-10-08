import React, {Fragment, useEffect, useMemo} from 'react';
import {Controlled as Editor} from 'react-codemirror2';
import classNames from 'classnames';

import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/edit/closebrackets';
// import 'codemirror/addon/edit/trailingspace';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';

import {Button} from './UI';

const Field = props => {
  const {value, onChange, format, width, classss, readOnly} = props;
  useEffect(() => {
  }, []);
  // const textRef = React.useRef();
  // useEffect(() => {}, []);

  // console.log(codemirror())

  const handleChange = (editor, data, value) => {
    onChange(value);
  };

  const cons = () => {
    console.log('data');
  };
  return (
    <div className={classNames('field', `${classss}`)} style={{width}}>
      <Editor
        value={value}
        onBeforeChange={handleChange}
        options={{
          mode: 'javascript',
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

        // cursorActivity={cons}
      />
      {/* <div ref={textRef} className="field">
        <label htmlFor={'label'}>Запрос:</label>

        {/* <div> */}
      {/* <textarea  className="textarea"></textarea> */}
      {/* </div> */}
      {/* <Button onClick={format}>FormatTest</Button> */}
    </div>
  );
};

export default Field;
