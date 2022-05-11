// Imports
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Landing, Error, Register, ProtectedRoute } from './pages';
import { SharedLayout, Stats, Profile, AddJob, AllJobs } from './pages/dashboard'

// Component
function App(){

	// Return
	return(
		<BrowserRouter>

			{/* Routes */}
			<Routes>

				{/* Dashboard */}
				<Route path="/" element={ <ProtectedRoute><SharedLayout/></ProtectedRoute> }>
					<Route index element={ <Stats/> }/>
					<Route path="/all-jobs" element={ <AllJobs/> }/>
					<Route path="/add-job" element={ <AddJob/> }/>
					<Route path="/profile" element={ <Profile/> }/>
				</Route>
				{/* Dashboard */}

				{/* Landing */}
				<Route path="/landing" element={ <Landing/> } />
				{/* Landing */}

				{/* Register */}
				<Route path="/register" element={ <Register/> } />
				{/* Register */}

				{/* Error */}
				<Route path="*" element={ <Error/> } />
				{/* Error */}

			</Routes>
			{/* Routes */}

			{/* Toast, in index.css => .Toastify__toast { text-transform: none; }
			https://fkhadra.github.io/react-toastify/introduction/ */}
			<ToastContainer position="top-center" autoClose={ 2000 }/>
			{/* Toast */}

		</BrowserRouter>
	);

};

// Export
export default App;