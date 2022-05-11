// Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllJobsThunk, showStatsThunk } from './allJobsThunk';

// Initial states
const initialFiltersState = {
	search:'',
	searchStatus:'all',
	searchType:'all',
	sort:'latest',
	sortOptions:['latest','oldest','a-z','z-a']
};

const initialState = {
	isLoading:false,
	jobs:[],
	totalJobs:0,
	numOfPages:1,
	page:1,
	stats:{},
	monthlyApplications:[],
	...initialFiltersState
};

// Thunks
// Get all jobs
export const getAllJobs = createAsyncThunk('allJobs/getJobs', getAllJobsThunk);
// Show stats
export const showStats = createAsyncThunk('allJobs/showStats', showStatsThunk);

// Slice
const allJobsSlice = createSlice({
	name:'allJobs',
	initialState,
	reducers:{
		// Show / hide loading, because deleteJob is in jobSlice.js
		// and me need to dispatch this action with thunkAPI
		// to show and hide the loading while request deleteJob is running
		showLoading:(state) => {
			state.isLoading = true;
		},
		hideLoading:(state) => {
			state.isLoading = false;
		},
		// Filters
		handleChange:(state, { payload:{ name, value } }) => {
			/* We reset state.page to 1, because filtering after a request 
			that generate 8 pages by example, and then we only have 3 pages, 
			then state.page = 8; will no longer display jobs. */
			state.page = 1;
			state[name] = value;
		},
		clearFilters:(state) => {
			return { ...state, ...initialFiltersState };
		},
		// Pagination
		changePage:(state, action) => {
			const page = action.payload;
			state.page = page;
		},
		// Clear state after logout (reset)
		clearAllJobsState:() => {
			return initialState;
		}
	},
	extraReducers:{
		// Get all jobs
		[getAllJobs.pending]:(state) => {
			state.isLoading = true;
		},
		[getAllJobs.fulfilled]:(state, action) => {
			const { jobs, numOfPages, totalJobs } = action.payload;
			state.isLoading = false;
			state.jobs = jobs;
			state.numOfPages = numOfPages;
			state.totalJobs = totalJobs;
		},
		[getAllJobs.rejected]:(state, action) => {
			const message = action.payload;
			state.isLoading = false;
			toast.error(message);
		},
		// Show stats
		[showStats.pending]:(state) => {
			state.isLoading = true;
		},
		[showStats.fulfilled]:(state, action) => {
			state.isLoading = false;
			state.stats = action.payload.defaultStats;
			state.monthlyApplications = action.payload.monthlyApplications;
		},
		[showStats.rejected]:(state, action) => {
			const message = action.payload;
			state.isLoading = false;
			toast.error(message);
		}
	}
})

// Actions export
export const { showLoading, hideLoading, handleChange, clearFilters, changePage, clearAllJobsState } = allJobsSlice.actions;

// Reducer export
export default allJobsSlice.reducer;