import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { CenteredContainer, CardContainer, CardInput, CardButton, CardLogo, Logo, toastDefaultStyle } from "@layout/mainElements";

import LogoImg from "@images/dlogo.png";

const RegisterForm = () => {
	const navigate = useNavigate();
	const { backendActor } = useAuth();
	const [name, setName] = useState("");
	const [principal, setPrincipal] = useState("");
	const [disabled, setDisabled] = useState(false);

	const teams = ["poppy-parrots", "sassy-dolphins", "bitchy-beavers", "guiso-de-pollo", "pathetic-pinguin", "nuzzling-numbats", "squeeky-squirrels", "rowdy-raptors", "cozy-koalas", "douchbag-dragons", "crispy-chimpanzees"];

	const handleNameInputChange = (e) => {
		const value = e.target.value;
		setName(value);
	};

	const handlePrincipalInputChange = (e) => {
		const value = e.target.value;
		setPrincipal(value);
	};

	const handleRegisterUser = async () => {
		if (disabled) return;

		setDisabled(true);

		toast.info("Registering...", toastDefaultStyle);

		let team = Math.floor(Math.random() * teams.length);

		await backendActor.addMyProfile({
			name: name,
			team: teams.at(team),
			cli: principal,
			graduate: false,
			progress: 0,
		});

		toast.success("Account registered!", toastDefaultStyle);

		navigate("/");
	};

	return (
		<CenteredContainer>
			<CardContainer>
				<CardLogo>
					<Logo src={LogoImg} style={{ height: "30px", width: "60px" }} alt="logo" />
				</CardLogo>
				<CardInput type="text" value={name} placeholder="Username" onChange={handleNameInputChange} />
				<CardInput type="text" value={principal} placeholder="Principal Id (CLI)" onChange={handlePrincipalInputChange} />
				<CardButton onClick={handleRegisterUser}>Create user</CardButton>
			</CardContainer>
		</CenteredContainer>
	);
};

export default RegisterForm;
