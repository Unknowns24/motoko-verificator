import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import Error503 from "@pages/Error/503";

export const NoAuthRoute = ({ children }) => {
	const { isAuthenticated } = useAuth();

	return isAuthenticated ? <Navigate to="/" /> : children;
};

export const AuthRoute = ({ children }) => {
	const { isAuthenticated } = useAuth();

	return !isAuthenticated ? <Error503 /> : children;
};
