// Imports
import axios from 'axios';
import { getUserFromLocalStorage } from './localStorage';
import { clearStore } from '../features/user/userSlice';

// This function will be invoked in our HTTP request to save time by not always typing baseURL ...
const customFetch = axios.create({
	baseURL:'https://jobify-prod.herokuapp.com/api/v1/toolkit'
});

// Axios interceptors for passing headers, error ...
customFetch.interceptors.request.use(
	(config) => {
		const user = getUserFromLocalStorage();
		if (user){
			config.headers.common['Authorization'] = `Bearer ${ user.token }`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// If status = 401, unauthorized => log out !
export const checkForUnauthorizedResponse = (error, thunkAPI) => {
	if (error.response.status === 401){
		thunkAPI.dispatch(clearStore());
		return thunkAPI.rejectWithValue('Unauthorized ! Logging out...');
	}
	return thunkAPI.rejectWithValue(error.response.data.msg);
};

// Export
export default customFetch;