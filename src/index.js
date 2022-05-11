// Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import './index.css';
import App from './App';

// Store
import { Provider } from 'react-redux';
import store from './store';

// ReactDOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={ store }>
			<App tab="home"/>
		</Provider>
	</React.StrictMode>
);