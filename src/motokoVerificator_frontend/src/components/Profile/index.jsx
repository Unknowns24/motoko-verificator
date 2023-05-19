import React from "react";
import { CenteredHomeContainer, CardContainer, CardInput, CardLogo, CardTitle, CardLabel } from "@layout/mainElements";

const ProfileComponent = ({ userData }) => {
	return (
		<CenteredHomeContainer>
			<CardContainer>
				<CardLogo>
					<CardTitle>Student Profile</CardTitle>
				</CardLogo>
				<CardLabel>Username</CardLabel>
				<CardInput type="text" disabled value={userData.name} />
				<CardLabel>Team</CardLabel>
				<CardInput type="text" disabled value={userData.team} />
				<CardLabel>Graduation progress</CardLabel>
				<CardInput type="text" disabled value={`${userData.progress}%`} />
				<CardLabel>Graduated</CardLabel>
				<CardInput type="text" disabled value={userData.graduate ? "Yes" : "No"} />
			</CardContainer>
		</CenteredHomeContainer>
	);
};

export default ProfileComponent;
