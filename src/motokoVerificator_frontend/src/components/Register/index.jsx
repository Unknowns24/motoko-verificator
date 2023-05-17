import React, { useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { CenteredContainer, CardContainer, CardInput, CardButton, CardLogo, Logo } from "@layout/mainElements";

import LogoImg from "@images/logo.png";

const RegisterForm = () => {
	const navigate = useNavigate();
	const { backendActor } = useAuth();
	const [name, setName] = useState("");
	const [disabled, setDisabled] = useState(false);

	const teams = ["poppy-parrots", "sassy-dolphins", "bitchy-beavers", "guiso-de-pollo", "pathetic-pinguin", "nuzzling-numbats", "squeeky-squirrels", "rowdy-raptors", "cozy-koalas", "douchbag-dragons", "crispy-chimpanzees"];

	const handleInputChange = (e) => {
		const value = e.target.value;
		setName(value);
	};

	const handleRegisterUser = async () => {
		if (disabled) return;

		setDisabled(true);

		toast.info("Registering...", {
			position: "bottom-right",
			autoClose: 2000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		});

		let team = Math.floor(Math.random() * teams.length);

		await backendActor.addMyProfile({
			name: name,
			team: teams.at(team),
			graduate: false,
		});

		toast.success("Account registered!", {
			position: "bottom-right",
			autoClose: 2000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		});

		navigate("/");
	};

	return (
		<CenteredContainer>
			<CardContainer>
				<CardLogo>
					<Logo src={LogoImg} alt="logo" />
				</CardLogo>
				<CardInput type="text" value={name} placeholder="Username" onChange={handleInputChange} />
				<CardButton onClick={handleRegisterUser}>Create user</CardButton>
			</CardContainer>
		</CenteredContainer>
	);
};

export default RegisterForm;
