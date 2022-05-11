// Imports
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Wrapper from './DashboardFormWrapper';
import { FormRow, FormRowSelect } from '../../components';
import { handleChange, clearValues, createJob, editJob } from '../../features/job/jobSlice';

// Component
const AddJob = () => {

	// Store
	const { isLoading, position, company, jobLocation, jobType, jobTypeOptions, 
		status, statusOptions, isEditing, editJobId } = useSelector((store) => { return store.job });
	const { user } = useSelector((store) => { return store.user });
	const dispatch = useDispatch();

	// Autofill job location
	useEffect(() => {
		if (!isEditing){
			dispatch(handleChange({ name:'jobLocation', value:user.location }));
		}
		// eslint-disable-next-line
	},[]);

	// Submit form
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!position || !company || !jobLocation){
			toast.error('Please fill out all fields');
			return;
		}
		if (isEditing){
			dispatch(editJob({ jobID:editJobId, job:{ position, company, jobLocation, jobType, status } }));
		} else {
			dispatch(createJob({ position, company, jobLocation, jobType, status }));
		}
		navigate('/all-jobs');
	};

	// Input change
	const handleJobInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		dispatch(handleChange({ name, value }));
	};

	// Return
	return(
		<Wrapper>
			<form className="form">
				<h3>{ isEditing ? 'Edit job' : 'Add job' }</h3>
				<div className="form-center">

					{/* Position */}
					<FormRow type="text" name="position" value={ position } handleChange={ handleJobInput }/>
					{/* Position */}

					{/* Company */}
					<FormRow type="text" name="company" value={ company } handleChange={ handleJobInput }/>
					{/* Company */}

					{/* Job location */}
					<FormRow type="text" name="jobLocation" labelText="Job location" 
						value={ jobLocation } handleChange={ handleJobInput }/>
					{/* Job location */}

					{/* Status */}
					<FormRowSelect name="status" value={ status } handleChange={ handleJobInput } 
						list={ statusOptions }/>
					{/* Status */}

					{/* Job type */}
					<FormRowSelect name="jobType" labelText="Job type" value={ jobType } 
						handleChange={ handleJobInput } list={ jobTypeOptions }/>
					{/* Job type */}

					{/* Buttons */}
					<div className="btn-container">
						<button type="button" className="btn btn-block clear-btn" 
							onClick={ () => { dispatch(clearValues()); } }>
							Clear
						</button>
						<button type="submit" className="btn btn-block submit-btn" 
							disabled={ isLoading } onClick={ handleSubmit }>
							{ isLoading ? 'Please wait...' : 'Save changes' }
						</button>
					</div>
					{/* Buttons */}

				</div>
			</form>
		</Wrapper>
	);

};

// Export
export default AddJob;