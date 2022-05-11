// Imports
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FormRow } from '../../components';
import { updateUser } from '../../features/user/userSlice';
import Wrapper from './DashboardFormWrapper';

// Component
const Profile = () => {

	// Store
	const { isLoading, user } = useSelector((store) => { return store.user });
	const dispatch = useDispatch();

	// State
	const [userData, setUserData] = useState({
		// IF user access name OR empty string
		name:user?.name || '',
		email:user?.email || '',
		lastName:user?.lastName || '',
		location:user?.location || ''
	});

	// Submit form
	const handleSubmit = (e) => {
		e.preventDefault();
		const { name, email, lastName, location } = userData;
		if (!name || !email || !lastName || !location){
			toast.error('Please fill out all fields');
			return;
		}
		dispatch(updateUser(userData));
	};

	// Input change
	const handleChange = (e) => {
		setUserData({ ...userData, [e.target.name]:e.target.value });
	};

	// Return
	return(
		<Wrapper>
			<form className="form" onSubmit={ handleSubmit }>
				<h3>Profile</h3>
				<div className="form-center">

					{/* Name */}
					<FormRow type="text" name="name" value={ userData.name } 
						handleChange={ handleChange }/>
					{/* Name */}

					{/* Last name */}
					<FormRow type="text" labelText="last name" name="lastName" value={ userData.lastName } 
						handleChange={ handleChange }/>
					{/* Last name */}

					{/* Email */}
					<FormRow type="email" name="email" value={ userData.email } 
						handleChange={ handleChange }/>
					{/* Email */}

					{/* Location */}
					<FormRow type="text" name="location" value={ userData.location } 
						handleChange={ handleChange }/>
					{/* Location */}

					{/* Submit btn */}
					<button type="submit" className="btn btn-block" disabled={ isLoading }>
						{ isLoading ? 'Please wait...' : 'Save changes' }
					</button>
					{/* Submit btn */}

				</div>
			</form>
		</Wrapper>
	);

};

// Export
export default Profile;