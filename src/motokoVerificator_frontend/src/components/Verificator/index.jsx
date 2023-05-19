import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CenteredHomeContainer, CardContainer, CardInput, CardLogo, CardTitle, CardLabel, CardButton } from "@layout/mainElements";
import { selectCustomStyles } from "@layout/mainElements";

import Select from "react-select";

const options = [
	{ value: "1", label: "Day 1" },
	{ value: "2", label: "Day 2" },
	{ value: "3", label: "Day 3" },
	{ value: "4", label: "Day 4" },
];

const VerificatorComponent = () => {
	let [searchParams] = useSearchParams();
	const day = searchParams.get("day");

	const [canisterId, setCanisterId] = useState("");
	const [selectedDay, setSelectedDay] = useState(day !== null && day >= 1 && day <= 4 ? { value: day.toString(), label: `Day ${day}` } : null);

	const handleInputChange = (e) => {
		const value = e.target.value;
		setCanisterId(value);
	};

	const handleSubmit = () => {};

	return (
		<CenteredHomeContainer>
			<CardContainer>
				<CardLogo>
					<CardTitle>Submit work</CardTitle>
				</CardLogo>
				<CardLabel>Canister Id</CardLabel>
				<CardInput type="text" value={canisterId} onChange={handleInputChange} />
				<CardLabel>Day</CardLabel>
				<Select styles={selectCustomStyles} defaultValue={selectedDay} onChange={setSelectedDay} options={options} />
				<CardButton onClick={handleSubmit}>Submit</CardButton>
			</CardContainer>
		</CenteredHomeContainer>
	);
};

export default VerificatorComponent;
