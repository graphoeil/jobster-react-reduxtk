// Imports
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// Component
const BarChartComponent = ({ data }) => {

	// Return
	return(
		<ResponsiveContainer width="100%" height={ 300 }>
			<BarChart data={ data } margin={ { top:50 } }>
				{/* CartesianGrid, the grid behind the chart, strokeDasharray => dotted line size */}
				<CartesianGrid strokeDasharray='10 10'/>
				{/* dataKey because datakey in monthlyApplications 
				return is => date(pin):"Jul 2021" */}
				<XAxis dataKey='date'/>
				<YAxis allowDecimals={ false }/>
				<Tooltip/>
				{/* Same as XAxis => dataKey => count(pin):1 */}
				<Bar dataKey='count' fill="#3b82f6" barSize={ 75 }/>
			</BarChart>
		</ResponsiveContainer>
	);

};

// Export
export default BarChartComponent;