import React, { useEffect, useState } from "react";
import { useAuth } from "@hooks/useAuth";

import Loading from "@components/Loading";

const User = () => {
	const { backendActor } = useAuth();
	const [show, setShow] = useState(false);

	useEffect(() => {
		const verifyRegistered = async () => {
			const isRegistered = await backendActor.imRegistered();

			setShow(isRegistered);
		};

		verifyRegistered();
	}, []);

	return !show ? <Loading /> : <p>Not registered</p>;
};

export default User;
