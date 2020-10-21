import React from 'react';
import classNames from 'classnames';

import meh from '../assets/img/meh.png';

const Error = props => {
	return (
		<div className={classNames('error')}>
			<img alt="meh" src={meh} />
			<div>
				<div>Вход не вышел </div>
				<footer>{JSON.stringify(props.textError)}</footer>
			</div>
		</div>
	);
};

export default Error;
