import React from 'react';
import {Field, Footer, Header, History} from '../components';
import beautify from 'js-beautify'
import useLocalStorage from '../hooks/useLocalStorage';


const Main = () => {
  const [requestValue, setRequestValue] = useLocalStorage();

  const format = () => {
    console.log('format');
    console.log(beautify(requestValue))
    setRequestValue(beautify(requestValue))
  };
  return (
    <div>
      <Header />
      <History />
      <div className="main__fields">
        <Field value={requestValue} onChange={setRequestValue} format={format} />
        <div>:</div>
        {/* <Field /> */}
      </div>
      <Footer />
    </div>
  );
};

export default Main;
