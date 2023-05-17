import React, { useState, useEffect } from "react";
import WebPage from "@layout/mainElements";
import { useAuth } from "@hooks/useAuth";

const Profile = () => {
	const { backendActor } = useAuth();
	const [userData, setUserData] = useState("");

	useEffect(() => {
		const getMyData = async () => {
			const res = await backendActor.seeMyProfile();

			setUserData(JSON.stringify(res));
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
