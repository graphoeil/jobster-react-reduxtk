// Imports
import React from 'react';

// Component
const FormRowSelect = (props) => {

	// Destructuring
	const { name, value, handleChange, labelText, list } = props;

	// Return
	return(
		<div className="form-row">
			<label htmlFor={ name } className="form-label">{ labelText || name }</label>
			<select name={ name } id={ name } className="form-select" value={ value } onChange={ handleChange }>
				{
					list.map((itemValue, index) => {
						return(
							<option key={ index } value={ itemValue }>
								{ itemValue }
							</option>
						);
					})
				}
			</select>
		</div>
	);

};

// Export
export default FormRowSelect;