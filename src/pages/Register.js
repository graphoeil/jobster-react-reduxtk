// Imports
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';
import { Logo, FormRow } from '../components';

// Global state
const initialState = {
	name:'',
	email:'',
	password:'',
	isMember:true
};

// Component
const Register = () => {

	// Autofocus on first input
	const nameRef = useRef();
	const emailRef = useRef();
	useEffect(() => {
		emailRef.current.focus();
	},[]);

	// Store
	const { isLoading, user } = useSelector((store) => { return store.user });
	const dispatch = useDispatch();

	// Local state
	const [values, setValues] = useState(initialState);

	// User connected => redirect to dashboard
	const navigate = useNavigate();
	useEffect(() => {
		if (user){
			navigate('/');
		}
		// eslint-disable-next-line
	},[user]);

	// Methods
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]:e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const { name, email, password, isMember } = values;
		if (!email || !password || (!isMember && !name)){
			// We add ToastContainer in App.js !
			/* Toast methods => no-methods, .error(), .warning(), .success,
			see docs => https://fkhadra.github.io/react-toastify/introduction/ */
			toast.error('Please fill out all fields', {
				autoClose:1777
			});
			return;
		}
		// Login (isMember)
		if (isMember){
			dispatch(loginUser({ email, password }));
			return;
		}
		// Register (!isMember)
		dispatch(registerUser({ name, email, password }));
	};
	const toggleMember = () => {
		setValues({ ...values, isMember:!values.isMember });
		setTimeout(() => {
			if (!values.isMember){
				emailRef.current.focus();
			} else {
				nameRef.current.focus();
			}
		}, 50);
	};

	// Return
	return(
		<Wrapper className="full-page">
			<form className="form" onSubmit={ handleSubmit }>
				<Logo/>
				
				{/* Login / Register */}
				<h3>{ values.isMember ? 'login' : 'register' }</h3>
				{/* Login / Register */}

				{/* Name */}
				{
					!values.isMember && <FormRow type="text" name="name" ref={ nameRef }
					value={ values.name } handleChange={ handleChange }/>
				}
				{/* Name */}

				{/* Email */}
				<FormRow type="email" name="email" ref={ emailRef }
					value={ values.email } handleChange={ handleChange }/>
				{/* Email */}

				{/* Password */}
				<FormRow type="password" name="password" value={ values.password } 
					handleChange={ handleChange }/>
				{/* Password */}

				{/* Submit */}
				<button type="submit" className="btn btn-block" disabled={ isLoading }>
					{ isLoading ? 'Loading' : 'Submit' }
				</button>
				<button type="button" className="btn btn-block btn-hipster" disabled={ isLoading } 
					onClick={ () => { dispatch(loginUser({ email:'testUser@test.com', password:'secret' })) } }>
					{ isLoading ? 'Loading' : 'Demo' }
				</button>
				<p>
					{ values.isMember ? 'Not a member yet ?' : 'Already a member ?' }
					<button type="button" className="member-btn" onClick={ toggleMember }>
						{ values.isMember ? 'Register' : 'Login' }
					</button>
				</p>
				{/* Submit */}

			</form>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.section`
	display: grid;
	align-items: center;
	.logo {
		display: block;
		margin: 0 auto;
		margin-bottom: 1.38rem;
	}
	.form {
		max-width: 400px;
		border-top: 5px solid var(--primary-500);
	}
	h3 {
		text-align: center;
	}
	p {
		margin: 0;
		margin-top: 1rem;
		text-align: center;
	}
	.btn {
		margin-top: 1rem;
	}
	.member-btn {
		background: transparent;
		border: transparent;
		color: var(--primary-500);
		cursor: pointer;
		letter-spacing: var(--letterSpacing);
	}
`;

// Export
export default Register;