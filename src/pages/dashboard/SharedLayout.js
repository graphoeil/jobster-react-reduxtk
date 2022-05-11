// Imports
import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { Navbar, SmallSidebar, BigSidebar } from '../../components';

// Component
const SharedLayout = () => {

	// Return
	return(
		<Wrapper>
			<main className="dashboard">

				{/* Sidebars */}
				<SmallSidebar/>
				<BigSidebar/>
				{/* Sidebars */}

				{/* Navbar & contents */}
				<div>
					<Navbar/>
					<div className="dashboard-page">
						{/* Outlet component render active nested route,
						here <Stats/> because of index in App.js */}
						<Outlet/>
					</div>
				</div>
				{/* Navbar & contents */}

			</main>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.section`
	.dashboard {
		display: grid;
		grid-template-columns: 1fr;
	}
	.dashboard-page {
		width: 90vw;
		margin: 0 auto;
		padding: 2rem 0;
	}
	@media (min-width: 992px) {
		.dashboard {
		grid-template-columns: auto 1fr;
		}
		.dashboard-page {
		width: 90%;
		}
	}
`;

// Export
export default SharedLayout;