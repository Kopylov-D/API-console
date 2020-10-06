import React from 'react';
import classNames from 'classnames';
import {useDispatch, useSelector} from 'react-redux';

import {Error} from '../components';
import {Button, Input, Logo} from '../components/UI/';

import {validate} from '../utils/formUtils';

import {auth} from '../store/actions/auth';

const Auth = () => {
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [formControls, setFormControls] = React.useState({
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

  const dispatch = useDispatch();
  const {responseError, isLoading} = useSelector(({auth}) => auth);

  const loginHandler = () => {
    dispatch(
      auth(
        formControls.login.value,
        formControls.sublogin.value,
        formControls.password.value
      )
    );
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
        <Button disabled={!isFormValid} onClick={loginHandler} isLoading={isLoading}>
          Войти
        </Button>
      </form>
      <footer>@link-to-your-github</footer>
    </div>
  );
};

// const mapStateToProps = state => {
//   return {
//     responseError: state.auth.responseError,
//     isLoading: state.auth.isLoading,
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return {
//     auth: (login, sublogin, password) => dispatch(auth(login, sublogin, password)),
//   };
// };

export default Auth;
// export default connect(mapStateToProps, mapDispatchToProps)(Auth);
