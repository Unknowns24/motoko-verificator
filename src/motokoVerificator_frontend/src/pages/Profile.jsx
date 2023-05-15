import React from "react";
import Navbar from "@components/Navbar/index";
import { useAuth } from "@hooks/useAuth";

const Profile = () => {
	const { identity, principal } = useAuth();

	return (
		<>
			<Navbar />
			<div>Profile</div>
		</>
	);
};

export default Profile;
