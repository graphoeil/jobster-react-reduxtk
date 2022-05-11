// Imports
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';

// Methods
//
// Get all jobs, !!! server returns 10 jobs per page, 
// then we must send which page we want in the request,
// => /jobs?page=1&status=all&jobType=all&sort=latest
export const getAllJobsThunk = async(_, thunkAPI) => {
	// Query params
	const { page, search, searchStatus, searchType, sort } = thunkAPI.getState().allJobs;
	let url = `/jobs?page=${ page }&status=${ searchStatus }&jobType=${ searchType }&sort=${ sort }`;
	if (search){
		// Because &search='' will return no data
		url = url + `&search=${ search }`;
	}
	try {
		// !!! With axios.interceptors (in utils), no need to set headers for each request !!!
		// const response = await customFetch.get(url, {
		// 	headers:{
		// 		authorization:`Bearer ${ thunkAPI.getState().user.user.token }`
		// 	}
		// });
		const response = await customFetch.get(url);
		// console.log(response.data); {jobs: Array(10), totalJobs: 75, numOfPages: 8}, 
		// see getAllJobs.fulfilled in extraReducers
		return response.data;
	} catch(error) {
		return checkForUnauthorizedResponse(error, thunkAPI);
	}
};

// Show stats
export const showStatsThunk = async(_, thunkAPI) => {
	try {
		// No more header with axios.intercepts
		const response = await customFetch.get('/jobs/stats');
		return response.data;
	} catch (error){
		return checkForUnauthorizedResponse(error, thunkAPI);
	}
};