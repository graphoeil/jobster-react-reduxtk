// Imports
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getAllJobs } from '../features/allJobs/allJobsSlice';
import Loading from './Loading';
import Job from './Job';
import PageBtnContainer from './PageBtnContainer';

// Component
const JobsContainer = () => {

	// Store
	const { jobs, isLoading, page, totalJobs,  numOfPages, 
		search, searchStatus, searchType, sort } = useSelector((store) => { return store.allJobs });
	const dispatch = useDispatch();

	// Get all jobs
	let isDispatched = false;
	useEffect(() => {
		// isDispatched, to have only one toast alert in case of error,
		// because useEffect even with array dependancies is run twice
		if (!isDispatched){
			// eslint-disable-next-line
			isDispatched = true;
			dispatch(getAllJobs());
		}
		// eslint-disable-next-line
	},[page, search, searchStatus, searchType, sort]);

	// Returns
	if (isLoading){
		return(
			<Wrapper>
				<Loading center/>
			</Wrapper>
		);
	}
	if (jobs.length < 1){
		return(
			<Wrapper>
				<h2>No jobs to display...</h2>
			</Wrapper>
		);
	}
	return(
		<Wrapper>
			<h5>{ totalJobs } job{ totalJobs > 1 && 's' } found</h5>
			<div className="jobs">
				{
					jobs.map((job) => {
						return <Job key={ job._id } { ...job }/>
					})
				}
			</div>
			{
				numOfPages > 1 && <PageBtnContainer/>
			}
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.section`
	margin-top: 4rem;
	h2 {
		text-transform: none;
	}
	& > h5 {
		font-weight: 700;
	}
	.jobs {
		display: grid;
		grid-template-columns: 1fr;
		row-gap: 2rem;
	}
	@media (min-width: 992px) {
		.jobs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		}
	}
`;

// Export
export default JobsContainer;