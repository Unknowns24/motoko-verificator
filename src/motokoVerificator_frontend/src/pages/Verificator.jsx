import React from "react";
import WebPage from "@layout/mainElements";
import { useSearchParams } from "react-router-dom/";

const Verificator = () => {
	let [searchParams] = useSearchParams();

	const day = searchParams.get("day");

	return (
		<>
			<WebPage>
				<div>Verificator</div>
				<div>{day}</div>
			</WebPage>
		</>
	);
};

export default Verificator;
