// Imports
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// Component
const AreaChartComponent = ({ data }) => {

	// Return
	return(
		<ResponsiveContainer width="100%" height={ 300 }>
			<AreaChart data={ data } margin={ { top:50 } }>
				{/* CartesianGrid, the grid behind the chart */}
				<CartesianGrid strokeDasharray='3 3'/>
				{/* dataKey because datakey in monthlyApplications 
				return is => date(pin):"Jul 2021" */}
				<XAxis dataKey='date'/>
				<YAxis allowDecimals={ false }/>
				<Tooltip/>
				{/* Same as XAxis => dataKey => count(pin):1 */}
				<Area type="monotone" dataKey='count' stroke="#1e3a8a" fill="#3b82f6"/>
			</AreaChart>
		</ResponsiveContainer>
	);

};

// Export
export default AreaChartComponent;