import React, { useState, useEffect } from "react";
import { useAuth } from "@hooks/useAuth";
import WebPage from "@layout/mainElements";
import ProfileComponent from "@components/Profile";

const initialState = {
	name: "loading...",
	team: "loading...",
	progress: 0,
	graduate: false,
};

const Profile = () => {
	const { backendActor } = useAuth();
	const [userData, setUserData] = useState(initialState);

	useEffect(() => {
		function toObject(x) {
			return JSON.parse(
				JSON.stringify(
					x,
					(key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
				)
			);
		}

		const getMyData = async () => {
			const res = await backendActor.seeMyProfile();
			const obj = toObject(res);

			if (obj["ok"] !== undefined && obj["ok"] !== null) {
				setUserData(obj["ok"]);
			}
		};

		getMyData();
	}, []);

	return (
		<>
			<WebPage>
				<ProfileComponent userData={userData} />
			</WebPage>
		</>
	);
};

export default Profile;
