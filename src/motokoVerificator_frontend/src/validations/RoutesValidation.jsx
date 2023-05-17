import React, { useState, useEffect } from "react";
import { useAuth } from "@hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Error401 from "@pages/Error/401";
import Loading from "@components/Loading";

export const NoAuthRoute = ({ children }) => {
	const { isAuthenticated } = useAuth();

	return isAuthenticated ? <Navigate to="/" /> : children;
};

export const AuthRoute = ({ children }) => {
	const { isAuthenticated } = useAuth();

	return !isAuthenticated ? <Error401 /> : children;
};

export const RegisteredRoute = ({ children }) => {
	const { backendActor } = useAuth();
	const [show, setShow] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const verifyRegistered = async () => {
			const isRegistered = await backendActor.imRegistered();

			if (!isRegistered) {
				toast.warn("You must be register!", {
					position: "bottom-right",
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});

				navigate("/user");
			} else {
				setShow(true);
			}
		};

		verifyRegistered();
	}, []);

	return show ? children : <Loading />;
};
