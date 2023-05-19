import React, { useState, useEffect } from "react";
import { CenteredHomeContainer } from "@layout/mainElements";
import { useAuth } from "@hooks/useAuth";

import WebPage from "@layout/mainElements";
import AppCard from "@components/AppCard";

import calcImg from "@images/calc.jpg";
import coinImg from "@images/coin.jpg";
import hwDiaryImg from "@images/hwDiary.jpg";
import studentWallImg from "@images/studentWall.jpg";

const initialState = {
	day1: 0,
	day2: 0,
	day3: 0,
	day4: 0,
};

const Home = () => {
	const { backendActor } = useAuth();
	const [submits, setSubmits] = useState(initialState);

	useEffect(() => {
		const getSubmits = async () => {
			let res = await backendActor.getSubmits();

			if (res["ok"] !== undefined && res["ok"] !== null) {
				setSubmits(res["ok"]);
			}
		};

		getSubmits();
	}, []);

	return (
		<>
			<WebPage>
				<CenteredHomeContainer>
					<AppCard title="calculator" link="/verificator?day=1" imgSrc={calcImg} counter={submits.day1} />
					<AppCard title="hw diary" link="/verificator?day=2" imgSrc={hwDiaryImg} counter={submits.day2} />
					<AppCard title="motocoin" link="/verificator?day=3" imgSrc={coinImg} counter={submits.day3} />
					<AppCard title="student wall" link="/verificator?day=4" imgSrc={studentWallImg} counter={submits.day4} />
				</CenteredHomeContainer>
			</WebPage>
		</>
	);
};

export default Home;
