import React from "react";
import Navbar from "@components/Navbar/index";
import AppCard from "@components/AppCard";
import { CenteredHomeContainer } from "@layout/mainElements";

const Home = () => {
	return (
		<>
			<Navbar />
			<CenteredHomeContainer>
				<AppCard title="calculator" link="/verificator/calc" imgSrc="https://i.pinimg.com/236x/c4/eb/1f/c4eb1f8e82d21b11d5dd1345f8bf3061.jpg" counter={25} />
				<AppCard title="hw diary" link="/verificator/calc" imgSrc="https://png.pngtree.com/png-vector/20190527/ourmid/pngtree-book-icon-png-image_1110447.jpg" counter={5} />
				<AppCard title="motocoin" link="/verificator/calc" imgSrc="https://img.freepik.com/premium-vector/bitcoin-icon-payment-symbol-cryptocurrency-logo-virtual-currency-exchange-symbol-black-white-design-internet-finance-coins-isolated-simple-vector-illustration_545793-776.jpg" counter={3} />
				<AppCard title="student wall" link="/verificator/calc" imgSrc="https://cdn5.vectorstock.com/i/1000x1000/69/04/world-education-logo-design-vector-37686904.jpg" counter={2} />
			</CenteredHomeContainer>
		</>
	);
};

export default Home;
