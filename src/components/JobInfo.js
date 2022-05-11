// Imports
import React from 'react';
import styled from 'styled-components';

// Component
const JobInfo = ({ icon, text }) => {

	// Return
	return(
		<Wrapper>
			<span className="icon">{ icon }</span>
			<span className="text">{ text }</span>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.div`
	margin-top: 0.5rem;
	display: flex;
	align-items: center;

	.icon {
		font-size: 1rem;
		margin-right: 1rem;
		display: flex;
		align-items: center;
		svg {
		color: var(--grey-400);
		}
	}
	.text {
		text-transform: capitalize;
		letter-spacing: var(--letterSpacing);
	}
`;

// Export
export default JobInfo;