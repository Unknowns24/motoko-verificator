import React, { useState, useEffect } from "react";
import WebPage from "@layout/mainElements";
import { useAuth } from "@hooks/useAuth";

const Profile = () => {
	const { backendActor } = useAuth();
	const [userData, setUserData] = useState("");

	useEffect(() => {
		function toObject(x) {
			return JSON.stringify(
				x,
				(key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
			);
		}

		const getMyData = async () => {
			const res = await backendActor.seeMyProfile();

			setUserData(toObject(res));
		};

		getMyData();
	}, []);

	return (
		<>
			<WebPage>
				<div>Profile</div>
				<div>{userData}</div>
			</WebPage>
		</>
	);
};

export default Profile;
