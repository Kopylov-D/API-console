import React from 'react';
import {Button, Input, Logo} from '../components/UI/';
import {Error} from '../components'
import classNames from 'classnames';

const Auth = () => {
  return (
    <div className={classNames('auth')}>
      <Logo />
      <form className={classNames('auth__main')}>
        <header>API-консолька</header>
        <Error/>
        <Input label="Логин" invalid={true} />
        <Input label="Сублогин" optionalLabel="Опционально" invalid={false} />
        <Input label="Пароль" invalid={false} />
        <Button>Войти</Button>
      </form>
      <footer>@link-to-your-github</footer>
    </div>
  );
};

export default Auth;
