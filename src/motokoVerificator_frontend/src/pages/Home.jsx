import React from "react";
import WebPage from "@layout/mainElements";

import AppCard from "@components/AppCard";

import { CenteredHomeContainer } from "@layout/mainElements";

import calcImg from "@images/calc.jpg";
import coinImg from "@images/coin.jpg";
import hwDiaryImg from "@images/hwDiary.jpg";
import studentWallImg from "@images/studentWall.jpg";

const Home = () => {
	return (
		<>
			<WebPage>
				<CenteredHomeContainer>
					<AppCard title="calculator" link="/verificator/calculator" imgSrc={calcImg} counter={0} />
					<AppCard title="hw diary" link="/verificator/homework-diary" imgSrc={hwDiaryImg} counter={0} />
					<AppCard title="motocoin" link="/verificator/motocoin" imgSrc={coinImg} counter={0} />
					<AppCard title="student wall" link="/verificator/student-wall" imgSrc={studentWallImg} counter={0} />
				</CenteredHomeContainer>
			</WebPage>
		</>
	);
};

export default Home;
