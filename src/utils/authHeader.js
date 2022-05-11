// Headers, because it's often repeated
const authHeader = (thunkAPI) => {
	return{
		headers:{
			authorization:`Bearer ${ thunkAPI.getState().user.user.token }`
		}
	};
};

// Export
export default authHeader;