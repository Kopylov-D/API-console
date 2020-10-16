import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, Switch, withRouter} from 'react-router';

import {Logout} from './components';
import {Auth, Main} from './containers';

import {autoLogin} from './store/actions/auth';

function App(props) {
  useEffect(() => {
    props.autoLogin();
  }, []);

  return (
    <div className="wrapper">
      <Switch>
        {props.isAuth ? (
          <Fragment>
            <Route exact path="/" component={Main} />
            <Route path="/logout" component={Logout} />
            <Redirect to="/" />
          </Fragment>
        ) : (
          <Fragment>
            <Route path="/auth" component={Auth} />
            <Redirect to="/auth" />
          </Fragment>
        )}

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
