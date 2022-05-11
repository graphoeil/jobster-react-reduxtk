// Imports
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { FormRowSelect } from './';
import { handleChange, clearFilters } from '../features/allJobs/allJobsSlice';

// Component
const SearchContainer = () => {

	// Store
	const { isLoading, searchStatus, searchType, 
		sort, sortOptions } = useSelector((store) => { return store.allJobs; });
	const { statusOptions, jobTypeOptions } = useSelector((store) => { return store.job; });
	const dispatch = useDispatch();

	// Autocomplete with limit
	let timerSearch = useRef();
	const [searchValue, setSearchValue] = useState('');
	useEffect(() => {
		if (timerSearch.current){ clearTimeout(timerSearch.current); }
		timerSearch.current = setTimeout(() => {
			// Send to slice ,-)
			dispatch(handleChange({ name:'search', value:searchValue }));
		},250);
		// eslint-disable-next-line
	},[searchValue]);

	// FormRowSelect change
	const handleSearch = (e) => {
		// With this conditional return we wait for the previous request before
		// dispatching another action and another request, good to add to
		// autoComplete with limit
		if (isLoading){ return; }
		dispatch(handleChange({ name:e.target.name, value:e.target.value }));
	};

	// Form submit
	const handleSubmit = (e) => {
		e.preventDefault();
		setSearchValue('');
		dispatch(clearFilters());
	};

	// Return
	return(
		<Wrapper>
			<form className="form">
				<h4>Search form</h4>
				<div className="form-center">

					{/* Text search */}
					<div className="form-row">
						<label htmlFor="search" className="form-label">Position</label>
						<input type="text" name="search" id="search" className="form-input"
							onChange={ (e) => { setSearchValue(e.target.value); } } value={ searchValue } />
					</div>
					{/* Text search */}

					{/* Status */}
					<FormRowSelect labelText="Status" name="searchStatus" 
						handleChange={ handleSearch } value={ searchStatus } list={ ['all', ...statusOptions] }/>
					{/* Status */}

					{/* Type */}
					<FormRowSelect labelText="Job type" name="searchType" 
						handleChange={ handleSearch } value={ searchType } list={ ['all', ...jobTypeOptions] }/>
					{/* Type */}

					{/* Sort */}
					<FormRowSelect name="sort" 
						handleChange={ handleSearch } value={ sort } list={ sortOptions }/>
					{/* Sort */}

					{/* Clear btn */}
					<button type="submit" className="btn btn-block btn-danger" disabled={ isLoading } onClick={ handleSubmit }>
						Clear filters
					</button>
					{/* Clear btn */}

				</div>
			</form>
		</Wrapper>
	);

};

const Wrapper = styled.section`
	.form {
		width: 100%;
		max-width: 100%;
	}
	.form-input,
	.form-select,
	.btn-block {
		height: 35px;
	}
	.form-row {
		margin-bottom: 0;
	}
	.form-center {
		display: grid;
		grid-template-columns: 1fr;
		column-gap: 2rem;
		row-gap: 0.5rem;
	}
	h5 {
		font-weight: 700;
	}
	.btn-block {
		align-self: end;
		margin-top: 1rem;
	}
	@media (min-width: 768px) {
		.form-center {
		grid-template-columns: 1fr 1fr;
		}
	}
	@media (min-width: 992px) {
		.form-center {
		grid-template-columns: 1fr 1fr 1fr;
		}
		.btn-block {
		margin-top: 0;
		}
	}
`;

// Export
export default SearchContainer;