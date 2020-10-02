import React, {useState, useEffect} from 'react';
import classNames from 'classnames';
import Sendsay from 'sendsay-api';

import {Error} from '../components';
import {Button, Input, Logo} from '../components/UI/';

import {validate} from '../utils/formUtils';

const Auth = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [responseError, setResponseError] = useState('');
  const [formControls, setFormControls] = useState({
    login: {
      value: '',
      type: 'login',
      label: 'Логин',
      valid: false,
      touched: false,
      validation: {
        required: true,
        notCyrillic: true,
      },
    },
    sublogin: {
      value: '',
      type: 'sublogin',
      label: 'Сублогин',
      optionalLabel: 'Опционально',
      valid: true,
      touched: false,
      validation: {
        required: false,
        notCyrillic: true,
      },
    },
    password: {
      value: '',
      type: 'password',
      label: 'Пароль',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 8,
        notCyrillic: true,
      },
    },
  });

  useEffect(() => {}, []);

  const test = () => {
    console.log(test);
    const sendsay = new Sendsay();
    console.log(sendsay)
    sendsay.setSessionFromCookie();
  };

  const loginHandler = () => {
    console.log('login');
    const sendsay = new Sendsay({
      auth: {
        login: formControls.login.value,
        sublogin: '',
        password: formControls.password.value,
      },
    });

    sendsay
      .request({action: 'sys.settings.get', list: ['about.id']})
      .then(res => {
        console.log(res.list['about.id']);
        console.log(res);
        setResponseError('');
      })
      .catch(error => {
        setResponseError({id: error.id, explain: error.explain});
      });

    sendsay.setSessionFromCookie();

    var req = sendsay.request({
      action: 'sys.settings.get',

      list: [
        'about.confirm',
        'about.id',
        'about.label.member',
        'about.name',
        'about.open.dt',
        'about.open.visitor',
        'about.owner.email',
        'about.tarif',
        'about.user',
        'anketa.id.base',
        'anketa.id.custom',
        'interface.type',
        'interface.type.user',
        'issue.email.sender.moderation',
        'issue.pte.datakey',
        'lbac.inuse',
        'lbac.on',
        'member.hard.limit',
        'member.hard.rest',
        'member.noconfirm.limit',
        'member.noconfirm.rest',
        'pase.autopayment',
        'pase.destination',
        'pase.left',
        'pase.state',
        'about.chat.on',
      ],
    });

    req.then(function (res) {
      var settings = res.list;

      console.log(settings);
    });
  };

  const submitHandler = event => {
    event.preventDefault();
  };

  const onChangeHandler = (event, controlName) => {
    const newFormControls = {...formControls};
    const control = {...formControls[controlName]};

    control.value = event.target.value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);

    newFormControls[controlName] = control;

    let formValid = true;
    Object.keys(formControls).forEach(name => {
      formValid = newFormControls[name].valid && formValid;
    });

    setFormControls(newFormControls);
    setIsFormValid(formValid);
  };

  const renderInputs = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];
      return (
        <Input
          key={index}
          label={control.label}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          shouldValidate={!!control.validation}
          optionalLabel={control.optionalLabel}
          onChange={event => onChangeHandler(event, controlName)}
        />
      );
    });
  };

  return (
    <div className={classNames('auth')}>
      <Logo />
      <form className={classNames('auth__main')} onSubmit={submitHandler}>
        <header>API-консолька</header>
        {responseError ? <Error textError={responseError} /> : null}
        {renderInputs()}
        <Button disabled={!isFormValid} onClick={loginHandler}>
          Войти
        </Button>
        <Button onClick={test}>test</Button>
      </form>
      <footer>@link-to-your-github</footer>
    </div>
  );
};

export default Auth;
