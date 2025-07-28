import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
	const { id } = useSelector((state) => state.user);
	return id ? children : <Navigate to='/' />;
};

export default ProtectedRoute;
