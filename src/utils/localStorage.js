// Add user
export const addUserToLocalStorage = (user) => {
	localStorage.setItem('jobsterUser', JSON.stringify(user));
};

// Remove user
export const removeUserFromLocalStorage = () => {
	localStorage.removeItem('jobsterUser');
};

// Get user
export const getUserFromLocalStorage = () => {
	const result = localStorage.getItem('jobsterUser');
	const user = result ? JSON.parse(localStorage.getItem('jobsterUser')) : null;
	return user;
};