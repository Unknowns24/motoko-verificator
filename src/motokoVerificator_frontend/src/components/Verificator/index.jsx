import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CenteredHomeContainer, CardContainer, CardInput, CardLogo, CardTitle, CardLabel, CardButton, toastDefaultStyle } from "@layout/mainElements";
import { selectCustomStyles } from "@layout/mainElements";
import { useAuth } from "@hooks/useAuth";
import { toast } from "react-toastify";

import Select from "react-select";

const options = [
	{ value: "1", label: "Day 1" },
	{ value: "2", label: "Day 2" },
	{ value: "3", label: "Day 3" },
	{ value: "4", label: "Day 4" },
];

const VerificatorComponent = () => {
	const { backendActor } = useAuth();
	let [searchParams] = useSearchParams();
	const day = searchParams.get("day");

	const [canisterId, setCanisterId] = useState("");
	const [selectedDay, setSelectedDay] = useState(day !== null && day >= 1 && day <= 4 ? { value: day.toString(), label: `Day ${day}` } : null);
	const [disabled, setDisabled] = useState(false);

	const handleInputChange = (e) => {
		const value = e.target.value;
		setCanisterId(value);
	};

	const handleSelect = ({ value }) => {
		setSelectedDay(value);
	};

	const handleSubmit = async () => {
		if (disabled) return;

		if (canisterId === "" || selectedDay === null) {
			toast.error("Complete all the fields before submit!", toastDefaultStyle);
			return;
		}

		setDisabled(true);

		toast.info("Submitting...", toastDefaultStyle);
		const res = await backendActor.verifyWork(canisterId, day);

		if (res["ok"] !== undefined) {
			toast.success("Day submitted!", toastDefaultStyle);
			return;
		}

		toast.error(res["err"], toastDefaultStyle);
	};

	return (
		<CenteredHomeContainer>
			<CardContainer>
				<CardLogo>
					<CardTitle>Submit work</CardTitle>
				</CardLogo>
				<CardLabel>Canister Id</CardLabel>
				<CardInput type="text" value={canisterId} onChange={handleInputChange} />
				<CardLabel>Day</CardLabel>
				<Select styles={selectCustomStyles} defaultValue={selectedDay} onChange={(e) => handleSelect(e)} options={options} />
				<CardButton onClick={handleSubmit}>Submit</CardButton>
			</CardContainer>
		</CenteredHomeContainer>
	);
};

export default VerificatorComponent;
