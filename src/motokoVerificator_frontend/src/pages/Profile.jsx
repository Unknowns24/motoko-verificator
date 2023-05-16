import React, { useState, useEffect } from "react";
import Navbar from "@components/Navbar/index";
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
			<Navbar />
			<div>Profile</div>
			<div>{userData}</div>
		</>
	);
};

export default Profile;
