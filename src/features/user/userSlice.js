// Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from '../../utils/localStorage';
import { clearValues } from '../job/jobSlice';
import { clearAllJobsState } from '../allJobs/allJobsSlice';

// Initial state
const initialState = {
	isLoading:false,
	isSidebarOpen:false,
	user:getUserFromLocalStorage()
};

/* HTTP Methods
GET - Get resources from the server
POST - Submit resource from the server
PUT/PATCH - modify resource from the server
DELETE - delete resource from the server */

// Register, user is an object passed from Register.js as payload
export const registerUser = createAsyncThunk('user/registerUser', async(user, thunkAPI) => {
	try {
		// The server is looking for the user, and sends back the user object with token
		// We use this token for authenticating in the app ,-)
		const response = await customFetch.post('/auth/register', user);
		return response.data;
	} catch (error){
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
});

// Login
export const loginUser = createAsyncThunk('user/loginUser', async(user, thunkAPI) => {
	try {
		const response = await customFetch.post('/auth/login', user);
		return response.data;
	} catch (error){
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
});

// Update user
export const updateUser = createAsyncThunk('user/updateUser', async(user, thunkAPI) => {
	try {
		const response = await customFetch.patch('/auth/updateUser', user);
		return response.data;
	} catch (error){
		// If status = 401, unauthorized => log out !
		return checkForUnauthorizedResponse(error, thunkAPI);
	}
});

// Clear all stores after logout
export const clearStore = createAsyncThunk('user/clearStore', async(message, thunkAPI) => {
	try {
		// Log out user
		thunkAPI.dispatch(logoutUser(message));
		// Clear jobs value
		thunkAPI.dispatch(clearAllJobsState());
		// Clear job input value
		thunkAPI.dispatch(clearValues());
		// Return
		return Promise.resolve();
	} catch (error){
		return Promise.reject();
	}
});

// Slice
const userSlice = createSlice({
	name:'user',
	initialState,
	reducers:{
		// Sidebar
		toggleSidebar:(state) => {
			state.isSidebarOpen = !state.isSidebarOpen;
		},
		// Logout, payload is passed from navBar.js => 
		logoutUser:(state, { payload }) => {
			state.user = null;
			state.isSidebarOpen = false;
			removeUserFromLocalStorage();
			if (payload){
				toast.success(payload);
			}
		}
	},
	extraReducers:{
		// Register, registerUser => createAsyncThunk('user/registerUser',...
		[registerUser.pending]:(state) => {
			state.isLoading = true;
		},
		[registerUser.fulfilled]:(state, action) => {
			const { user } = action.payload;
			state.isLoading = false;
			state.user = user;
			addUserToLocalStorage(user);
			toast.success(`Hello there ${ user.name }`);
		},
		[registerUser.rejected]:(state, action) => {
			const message = action.payload;
			state.isLoading = false;
			toast.error(message);
		},
		// Login => user/loginUser
		[loginUser.pending]:(state) => {
			state.isLoading = true;
		},
		[loginUser.fulfilled]:(state, action) => {
			const { user } = action.payload;
			state.isLoading = false;
			state.user = user;
			addUserToLocalStorage(user);
			toast.success(`Welcome back ${ user.name }`);
		},
		[loginUser.rejected]:(state, action) => {
			const message = action.payload;
			state.isLoading = false;
			toast.error(message);
		},
		// Update user
		[updateUser.pending]:(state) => {
			state.isLoading = true;
		},
		[updateUser.fulfilled]:(state, { payload }) => {
			const { user } = payload;
			state.isLoading = false;
			state.user = user;
			addUserToLocalStorage(user);
			toast.success('User updated !');
		},
		[updateUser.rejected]:(state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
		// Clear store
		[clearStore.rejected]:() => {
			toast.error('There was an error...');
		}
	}
});

// Actions export
export const { toggleSidebar, logoutUser } = userSlice.actions;

// Reducer export
export default userSlice.reducer;