// Imports
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import main from '../assets/images/main.svg';
import { Logo } from '../components';

// Component
const Landing = () => {

	// Return
	return(
		<Wrapper>

			{/* Navigation */}
			<nav>
				<Logo/>
			</nav>
			{/* Navigation */}

			{/* Container */}
			<div className="container page">

				{/* Info */}
				<div className="info">
					<h1>Job <span>tracking</span> app</h1>
					<p>The wave crashed and hit the sandcastle head-on. The sandcastle began to melt under the waves force 
						and as the wave receded, half the sandcastle was gone. The next wave hit, not quite as strong, 
						but still managed to cover the remains of the sandcastle and take more of it away.</p>
					<Link to="/register" className="btn btn-hero">Login / Register</Link>
				</div>
				<img src={ main } alt="Job hunt" className="img main-img" />
				{/* Info */}

			</div>
			{/* Container */}

		</Wrapper>
	);

};

// Styled
const Wrapper = styled.main`
	nav{
		width: var(--fluid-width);
		max-width: var(--max-width);
		margin: 0 auto;
		height: var(--nav-height);
		display: flex;
		align-items: center;
	}
	.page{
		min-height: calc(100vh - var(--nav-height));
		display: grid;
		align-items: center;
		margin-top: -3rem;
	}
	h1{
		font-weight: 700;
		span{
			color: var(--primary-500);
		}
	}
	p{
		color: var(--grey-600);
	}
	.main-img{
		display: none;
	}
	@media only screen and (min-width: 992px){
		.page{
			grid-template-columns: 1fr 1fr;
			column-gap: 3rem;
		}
		.main-img{
			display: block;
		}
	}
`;

// Export
export default Landing;