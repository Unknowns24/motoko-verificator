import styled from "styled-components";

export const CenteredContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	width: 100vw;
	height: 100vh;
`;

export const CenteredHomeContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	height: calc(100vh - 80px);

	@media screen and (max-width: 1280px) {
		display: grid;
		height: auto;
		grid-template-columns: 1fr 1fr 1fr;
	}

	@media screen and (max-width: 905px) {
		display: grid;
		height: auto;
		grid-template-columns: 1fr 1fr;
	}

	@media screen and (max-width: 626px) {
		display: flex;
		flex-direction: column;
		height: auto;
	}
`;

export const CardContainer = styled.div`
	width: 90vw;
	max-width: 400px;
	padding: 25px;
	border: none;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	-webkit-box-shadow: 3px 0px 44px -3px rgba(19, 19, 27, 0.8);
	-moz-box-shadow: 3px 0px 44px -3px rgba(19, 19, 27, 0.8);
	box-shadow: 3px 0px 44px -3px rgba(19, 19, 27, 0.8);
	color: #fff;
	font-size: 1.2rem;

	background-color: #222232;
`;

export const CardInput = styled.input`
	width: 100%;
	height: 56px;
	border-radius: 4px;
	position: relative;
	background-color: rgba(0, 0, 0, 0.15);
	transition: 0.3s all;
	outline: none;
	border: none;
	font-size: 1rem;
	padding-left: 5px;
	color: #d3d3d3;
	margin-bottom: 5px;

	&:hover {
		background-color: rgba(0, 0, 0, 0.2);
		box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
	}
`;

export const CardTitle = styled.h2`
	color: #a89ec9;
	font-size: 1.1rem;
`;

export const CardLabel = styled.p`
	color: #a89ec9;
	font-size: 0.95rem;
`;

export const CardLogo = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const CardButton = styled.button`
	border-radius: 50px;
	background: #a72d83;
	white-space: nowrap;
	padding: 10px 22px;
	color: #010606;
	font-size: 16px;
	outline: none;
	border: none;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	text-decoration: none;
	margin-top: 25px;

	&:hover {
		transition: all 0.2s ease-in-out;
		background: #fff;
		color: #010606;
	}
`;

export const Logo = styled.img`
	margin-bottom: 25px;
	width: 60px;
	height: 30px;
`;

export const selectCustomStyles = {
	control: (base, state) => ({
		...base,
		background: "rgba(0, 0, 0, 0.15)",
		borderRadius: state.isFocused ? "3px 3px 0 0" : "none",
		borderColor: state.isFocused ? "#a72d83" : "black",
		boxShadow: null,
		color: "#fff",
		"&:hover": {
			borderColor: state.isFocused ? "#a72d83" : "black",
		},
	}),
	menu: (base) => ({
		...base,
		borderRadius: 0,
		marginTop: 0,
		background: "#222232",
	}),
	menuList: (base) => ({
		...base,
		padding: 0,
		background: "#222232",
	}),
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isSelected ? "#a72d83" : "#222232",

		"&:hover": {
			backgroundColor: state.isFocused ? "#a72d8291" : "#222232",
		},
	}),
	placeholder: (base) => ({
		...base,
		color: "#fff",
	}),
	input: (base) => ({
		...base,
		color: "#fff",
	}),
	singleValue: (base) => ({
		...base,
		color: "#fff",
	}),
	valueContainer: (base) => ({
		...base,
		color: "#fff",
	}),
	container: (base) => ({
		...base,
		color: "#fff",
	}),
};

export const toastDefaultStyle = {
	position: "bottom-right",
	autoClose: 4000,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: "dark",
};

import React, { useState } from "react";
import Sidebar from "@components/Sidebar";
import Navbar from "@components/Navbar";

const WebPage = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => {
		setIsOpen(!isOpen);
	};

	window.scrollTo({
		top: 0,
	});

	return (
		<>
			<Sidebar isOpen={isOpen} toggle={toggle} />
			<Navbar toggle={toggle} />
			{children}
		</>
	);
};

export default WebPage;
