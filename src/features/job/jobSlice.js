// Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { createJobThunk, deleteJobThunk, editJobThunk } from './jobThunk';

// Initial state
const initialState = {
	isLoading:false,
	position:'',
	company:'',
	jobLocation:'',
	jobTypeOptions:['full-time','part-time','remote','internship'],
	jobType:'full-time',
	statusOptions:['interview','declined','pending'],
	status:'pending',
	isEditing:false,
	editJobId:''
};

// Thunks
// Create job
export const createJob = createAsyncThunk('job/createJob', createJobThunk);
// Delete job
export const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunk);
// Edit job
export const editJob = createAsyncThunk('job/editJob', editJobThunk);

// Slice
const jobSlice = createSlice({
	name:'job',
	initialState,
	reducers:{
		// Input change
		handleChange:(state, action) => {
			const { name, value } = action.payload;
			state[name] = value;
		},
		// Clear values
		clearValues:() => {
			// We get jobLocation from localStorage if it exists ?.location OR empty string ,-)
			return { ...initialState, jobLocation:getUserFromLocalStorage()?.location || '' };
		},
		// Edit job
		/* Payload is passing from AddJob.js (position, company, jobLocation, jobType, status) */
		setEditJob:(state, { payload }) => {
			return { ...state, isEditing:true, ...payload };
		}
	},
	extraReducers:{
		// Create job
		[createJob.pending]:(state) => {
			state.isLoading = true;
		},
		[createJob.fulfilled]:(state) => {
			state.isLoading = false;
			toast.success('Job created');
		},
		[createJob.rejected]:(state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
		// Delete job
		[deleteJob.fulfilled]:(state, action) => {
			const message = action.payload;
			toast.success(message);
		},
		[deleteJob.rejected]:(state, action) => {
			const message = action.payload;
			toast.error(message);
		},
		// Edit job
		[editJob.pending]:(state) => {
			state.isLoading = true;
		},
		[editJob.fulfilled]:(state) => {
			state.isLoading = false;
			toast.success('Job modified...');
		},
		[editJob.rejected]:(state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
	}
});

// Actions export
export const { handleChange, clearValues, setEditJob } = jobSlice.actions;

// Reducer export
export default jobSlice.reducer;