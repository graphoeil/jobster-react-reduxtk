// Imports
import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import AreaChart from './AreaChart';
import BarChart from './BarChart';

// Component
const ChartsContainer = () => {

	// Store
	const { monthlyApplications:data } = useSelector((store) => { return store.allJobs });

	// Local state
	const [barChart, setBarChart] = useState(true);

	// Return
	return(
		<Wrapper>
			<h4>Monthly applications</h4>
			<button type="button" onClick={ () => { setBarChart(!barChart); } }>
				{
					barChart ? 'Area chart' : 'Bar chart'
				}
			</button>
			{
				barChart ? <BarChart data={ data }/> : <AreaChart data={ data }/>
			}
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.section`
	margin-top: 4rem;
	text-align: center;
	button {
		background: transparent;
		border-color: transparent;
		text-transform: capitalize;
		color: var(--primary-500);
		font-size: 1.25rem;
		cursor: pointer;
	}
	h4 {
		text-align: center;
		margin-bottom: 0.75rem;
	}
`;

// Export
export default ChartsContainer;