// Imports
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice';
import { clearValues } from './jobSlice';
// no need because of axios.interceptors !!!
// import authHeader from '../../utils/authHeader';

// Methods
//
// Create job
export const createJobThunk = async(job, thunkAPI) => {
	try {
		const response = await customFetch.post('/jobs', job);
		thunkAPI.dispatch(clearValues());
		return response.data;
	} catch (error){
		return checkForUnauthorizedResponse(error, thunkAPI);
	}
};

// Delete job
export const deleteJobThunk = async(jobID, thunkAPI) => {
	thunkAPI.dispatch(showLoading());
	try {
		const response = await customFetch.delete(`/jobs/${ jobID }`);
		thunkAPI.dispatch(getAllJobs());
		return response.data.msg;
	} catch (error){
		thunkAPI.dispatch(hideLoading());
		return checkForUnauthorizedResponse(error, thunkAPI);
	}
}

// Edit job
export const editJobThunk = async({ jobID, job }, thunkAPI) => {
	try {
		const response = await customFetch.patch(`/jobs/${ jobID }`, job);
		thunkAPI.dispatch(clearValues());
		return response.data;
	} catch (error){
		return checkForUnauthorizedResponse(error, thunkAPI);
	}
}