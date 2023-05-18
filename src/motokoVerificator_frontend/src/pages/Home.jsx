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
					<AppCard title="calculator" link="/verificator?day=1" imgSrc={calcImg} counter={0} />
					<AppCard title="hw diary" link="/verificator?day=2" imgSrc={hwDiaryImg} counter={0} />
					<AppCard title="motocoin" link="/verificator?day=3" imgSrc={coinImg} counter={0} />
					<AppCard title="student wall" link="/verificator?day=4" imgSrc={studentWallImg} counter={0} />
				</CenteredHomeContainer>
			</WebPage>
		</>
	);
};

export default Home;
