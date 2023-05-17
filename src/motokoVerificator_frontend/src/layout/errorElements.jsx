import styled from "styled-components";
import { Link } from "react-router-dom";

export const ErrorContainer = styled.div`
	position: relative;
	height: 100vh;
`;

export const ErrorDataContainer = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	-webkit-transform: translate(-50%, -50%);
	-ms-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	max-width: 520px;
	width: 100%;
	line-height: 1.4;
	text-align: center;
`;

export const ErrorCodeContainer = styled.div`
	position: relative;
	height: 240px;

	@media screen and (max-width: 480px) {
		height: 162px;
	}

	@media screen and (max-width: 767px) {
		height: 200px;
	}
`;

export const ErrorCodeTitle = styled.h3`
	font-family: "Cabin", sans-serif;
	position: relative;
	font-size: 16px;
	font-weight: 700;
	text-transform: uppercase;
	color: #838383;
	margin: 0px;
	letter-spacing: 3px;
	padding-left: 6px;
`;

export const ErrorCodeNumberContainer = styled.h1`
	font-family: "Montserrat", sans-serif;
	position: absolute;
	left: 50%;
	top: 50%;
	-webkit-transform: translate(-50%, -50%);
	-ms-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	font-size: 252px;
	font-weight: 900;
	margin: 0px;
	color: #838383;
	text-transform: uppercase;
	letter-spacing: -40px;
	margin-left: -20px;

	@media screen and (max-width: 480px) {
		font-size: 162px;
		height: 150px;
		line-height: 162px;
	}

	@media screen and (max-width: 767px) {
		font-size: 200px;
	}
`;

export const ErrorCodeNumber = styled.span`
	text-shadow: -8px 0px 0px #623281;
`;

export const ErrorText = styled.h2`
	font-size: 20px;
	font-weight: 400;
	color: #838383;
	margin-top: 0px;
	margin-bottom: 25px;

	@media screen and (max-width: 480px) {
		font-size: 16px;
	}
`;

export const ErrorBtnContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`;

export const ErrorButton = styled.button`
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
	max-width: 100px;

	&:hover {
		transition: all 0.2s ease-in-out;
		background: #fff;
		color: #010606;
	}
`;
