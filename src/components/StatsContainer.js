// Imports
import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import StatItem from './StatItem';

// Component
const StatsContainer = () => {

	// Store
	const { stats } = useSelector((store) => { return store.allJobs });

	// Data (initial)
	const defaultStats = [
		{
			title:'Pending applications',
			count:stats.pending || 0,
			icon:<FaSuitcaseRolling/>,
			color:'#e9b949',
			bcg:'#fcefc7'
		},
		{
			title:'interviews scheduled',
			count:stats.interview || 0,
			icon:<FaCalendarCheck />,
			color:'#647acb',
			bcg:'#e0e8f9'
		  },
		  {
			title:'jobs declined',
			count:stats.declined || 0,
			icon:<FaBug />,
			color:'#d66a6a',
			bcg:'#ffeeee'
		  },
	];

	// Return
	return(
		<Wrapper>
			{
				defaultStats.map((item, index) => {
					return <StatItem key={ index } { ...item }/>
				})
			}
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.section`
	display: grid;
	row-gap: 2rem;
	@media (min-width: 768px) {
		grid-template-columns: 1fr 1fr;
		column-gap: 1rem;
	}
	@media (min-width: 1120px) {
		grid-template-columns: 1fr 1fr 1fr;
		column-gap: 1rem;
	}
`;

// Export
export default StatsContainer;