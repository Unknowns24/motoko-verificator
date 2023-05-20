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
		function toObject(x) {
			return JSON.parse(
				JSON.stringify(
					x,
					(key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
				)
			);
		}

		const getSubmitsCount = async () => {
			if (backendActor != null) {
				const res = await backendActor.getDaysSubmits();
				setSubmits(toObject(res));
			}
		};

		getSubmitsCount();
	}, [backendActor]);

	return (
		<>
			<WebPage>
				<CenteredHomeContainer>
					<AppCard title="calculator" link="/verificator?day=1" imgSrc={calcImg} counter={submits.day1} />
					<AppCard title="hw diary" link="/verificator?day=2" imgSrc={hwDiaryImg} counter={submits.day2} />
					<AppCard title="student wall" link="/verificator?day=3" imgSrc={studentWallImg} counter={submits.day3} />
					<AppCard title="motocoin" link="/verificator?day=4" imgSrc={coinImg} counter={submits.day4} />
				</CenteredHomeContainer>
			</WebPage>
		</>
	);
};

export default Home;
