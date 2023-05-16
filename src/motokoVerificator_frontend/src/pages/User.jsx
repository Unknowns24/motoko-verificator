import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

import Loading from "@components/Loading";

const User = () => {
	const { backendActor } = useAuth();
	const [show, setShow] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const verifyRegistered = async () => {
			const isRegistered = await backendActor.imRegistered();

			if (isRegistered) {
				navigate("/");
			} else {
				setShow(isRegistered);
			}
		};

		verifyRegistered();
	}, []);

	return !show ? <Loading /> : <p>Not registered</p>;
};

export default User;
