import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

import Loading from "@components/Loading";
import RegisterForm from "@components/Register";

const User = () => {
	const { backendActor } = useAuth();
	const [show, setShow] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const verifyRegistered = async () => {
			const isRegistered = false; //await backendActor.imRegistered();

			if (isRegistered) {
				navigate("/");
			} else {
				setShow(true);
			}
		};

		verifyRegistered();
	}, []);

	return !show ? <Loading /> : <RegisterForm />;
};

export default User;
