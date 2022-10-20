// Imports
import React from 'react';

// Component
const FormRow = React.forwardRef((props, ref) => {

	// Destructuring
	const { type, name, value, handleChange, labelText } = props;

	// Return
	return(
		<div className="form-row">
			<label htmlFor={ name } className="form-label">{ labelText || name }</label>
			<input ref={ ref } type={ type } name={ name } id={ name } className="form-input"
				onChange={ handleChange } value={ value } />
		</div>
	);

});

// Export
export default FormRow;