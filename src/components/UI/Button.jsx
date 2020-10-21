import React from 'react';
import classNames from 'classnames';
import Loader from './Loader';

const Button = props => {
	return (
		<button
			className={classNames('button')}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			{props.isLoading ? <Loader /> : props.children}
		</button>
	);
};

export default Button;
