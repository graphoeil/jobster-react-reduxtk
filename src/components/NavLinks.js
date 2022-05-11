// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';
import links from '../utils/links';

// Component
const NavLinks = ({ toggleSidebar }) => {

	// Return
	return(
		<div className="nav-links">
			{
				links.map((link) => {
					// Variables
					const { id, text, path, icon } = link;
					// Return
					return(
						<NavLink key={ id } to={ path } className={ ({ isActive }) => {
							// isActive is a react-router-dom property
							return isActive ? 'nav-link active' : 'nav-link';
						} } onClick={ toggleSidebar }>
							<span className="icon">{ icon }</span>
							{ text }
						</NavLink>
					);
				})
			}
		</div>
	);

};

// Export
export default NavLinks;