import React, { useState, useEffect } from "react";
import { useAuth } from "@hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Error503 from "@pages/Error/503";
import Loading from "@components/Loading";

export const NoAuthRoute = ({ children }) => {
	const { isAuthenticated } = useAuth();

	return isAuthenticated ? <Navigate to="/" /> : children;
};

export const AuthRoute = ({ children }) => {
	const { isAuthenticated } = useAuth();

	return !isAuthenticated ? <Error503 /> : children;
};

export const RegisteredRoute = ({ children }) => {
	const { backendActor } = useAuth();
	const [show, setShow] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const verifyRegistered = async () => {
			const isRegistered = await backendActor.imRegistered();

			if (!isRegistered) {
				navigate("/user");
			} else {
				setShow(true);
			}
		};

		verifyRegistered();
	}, []);

	return show ? children : <Loading />;
};
