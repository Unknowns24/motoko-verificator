import styled from "styled-components";
import { Link } from "react-router-dom";
import LogoImg from "@images/logo.png";

const AppCardContainer = styled(Link)`
	user-select: none;
	max-width: 350px;
	margin: 5rem auto;
	border: 1px solid #ffffff22;
	background-color: #282c34;
	background: linear-gradient(0deg, rgba(40, 44, 52, 1) 0%, rgba(17, 0, 32, 0.5) 100%);
	box-shadow: 0 7px 20px 5px #00000088;
	border-radius: 0.7rem;
	backdrop-filter: blur(7px);
	-webkit-backdrop-filter: blur(7px);
	overflow: hidden;
	transition: 0.5s all;
	text-decoration: none;

	hr {
		width: 100%;
		border: none;
		border-bottom: 1px solid #88888855;
		margin-top: 0;
	}

	ins {
		text-decoration: none;
	}
`;

const AppCardMain = styled.div`
	display: flex;
	flex-direction: column;
	width: 90%;
	padding: 1rem;

	&:before {
		position: fixed;
		content: "";
		box-shadow: 0 0 100px 40px #ffffff08;
		top: -10%;
		left: -100%;
		transform: rotate(-45deg);
		height: 60rem;
		transition: 0.7s all;
	}
	&:hover {
		border: 1px solid #ffffff44;
		box-shadow: 0 7px 50px 10px #000000aa;
		transform: scale(1.015);
		filter: brightness(1.3);
		&:before {
			filter: brightness(0.5);
			top: -100%;
			left: 200%;
		}
	}
`;

const AppCardImg = styled.img`
	border-radius: 100%;
	width: 90px;
	height: 90px;
	object-fit: cover;
`;

const AppCardImgContainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	margin-top: 20px;
	margin-bottom: 30px;
`;

const AppCardTitleContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	color: #a89ec9;
	margin-bottom: 10px;
`;

const AppCardFooter = styled.div`
	display: flex;
	align-items: center;
	margin-top: 0.2rem;
	margin-bottom: -0.3rem;
	color: #fff;
	font-size: 1.1rem;
	ins {
		color: #a89ec9;
		text-decoration: none;
	}
`;

const AppCardWrapper = styled.div`
	display: flex;
	align-items: center;
	padding: 0.3rem;
	margin: 0;
	margin-right: 0.5rem;
	border-radius: 100%;
	box-shadow: inset 0 0 0 4px #000000aa;
	img {
		border-radius: 100%;
		border: 1px solid #ffffff22;
		width: 3rem;
		height: 3rem;
		object-fit: cover;
		margin: 0;
	}
`;

import React from "react";

const AppCard = ({ title, imgSrc, counter, link }) => {
	return (
		<AppCardContainer to={link}>
			<AppCardMain>
				<AppCardImgContainer>
					<AppCardImg src={imgSrc} alt="App" />
				</AppCardImgContainer>
				<AppCardTitleContainer>
					<h2>{title}</h2>
				</AppCardTitleContainer>
				<hr />
				<AppCardFooter>
					<AppCardWrapper>
						<img src={LogoImg} />
					</AppCardWrapper>
					<p>
						<ins>Submitted by</ins> {counter} <ins> students</ins>
					</p>
				</AppCardFooter>
			</AppCardMain>
		</AppCardContainer>
	);
};

export default AppCard;
