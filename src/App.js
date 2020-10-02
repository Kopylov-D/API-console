import React from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router';

import {Auth, Main} from './containers';

function App() {
  return (
    <div className="wrapper">
      <Switch>
        <Route path="/" exact component={Auth} />
        <Route path="/" component={Main} />

        <Redirect to="/auth" />
      </Switch>
    </div>
  );
}

export default withRouter(App);
