// Imports
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showStats } from '../../features/allJobs/allJobsSlice';
import { StatsContainer, CharsContainer } from '../../components';
import Loading from '../../components/Loading';

// Component
const Stats = () => {

	// Store
	const { isLoading, monthlyApplications } = useSelector((store) => { return store.allJobs });
	const dispatch = useDispatch();

	// Load stats
	let isDispatched = false;
	useEffect(() => {
		if (!isDispatched){
			// isDispatched, only one toast alert in case of error
			// eslint-disable-next-line
			isDispatched = true;
			dispatch(showStats());
		}
		// eslint-disable-next-line
	},[]);

	// Returns
	if (isLoading){
		return <Loading center/>
	}
	return(
		<React.Fragment>
			<StatsContainer/>
			{
				monthlyApplications.length > 0 && <CharsContainer/>
			}
		</React.Fragment>
	);

};

// Export
export default Stats;