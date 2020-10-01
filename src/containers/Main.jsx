import React from 'react';
import {Field, Footer, Header, History} from '../components';

const Main = () => {
  return (
    <div>
      <Header />
      <History />
      <div className='main__fields'>
        <Field />
        <div>:</div>
        <Field />
      </div>
      <Footer/>
    </div>
  );
};

export default Main;
