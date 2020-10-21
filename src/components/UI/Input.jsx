import React from 'react';
import classnames from 'classnames';

function isInvalid({ valid, shouldValidate, touched }) {
	return !valid && shouldValidate && touched;
}

const Input = props => {
	const inputType = props.type || 'text';
	const htmlFor = `${inputType}-${Math.random()}`;

	return (
		<div className={classnames('input', { '--invalid': isInvalid(props) })}>
			<div>
				<label htmlFor={htmlFor}>
					<span>{props.label}</span>
					<span>{props.optionalLabel}</span>
				</label>
			</div>

			<input
				id={htmlFor}
				type={inputType}
				value={props.value}
				onChange={props.onChange}
			/>
		</div>
	);
};

export default Input;
