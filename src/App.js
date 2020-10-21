import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router';

import { Logout } from './components';
import { Auth, Main } from './containers';

import { autoLogin } from './store/actions/auth';

const App = () => {
	const dispatch = useDispatch();
	const { isAuth } = useSelector(({ auth }) => auth);

	useEffect(() => {
		dispatch(autoLogin());
	}, []);

	return (
		<div className="wrapper">
			<Switch>
				{isAuth ? (
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
};

export default withRouter(App);
