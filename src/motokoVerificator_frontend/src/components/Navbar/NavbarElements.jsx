import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
	background: #191923;
	height: 80px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1rem;
	position: sticky;
	top: 0;
	z-index: 10;

	@media screen and (max-width: 960px) {
		transition: 0.8s all ease;
	}
`;

export const NavbarContainer = styled.div`
	display: flex;
	justify-content: space-between;
	height: 80px;
	z-index: 1;
	width: 100%;
	max-width: 1100px;

	@media screen and (max-width: 1050px) {
		padding-left: 25px;
		padding-right: 25px;
	}
`;

export const NavLogo = styled(Link)`
	color: #fff;
	justify-self: flex-start;
	cursor: pointer;
	font-size: 1.5rem;
	display: flex;
	align-items: center;
	font-weight: bold;
	text-decoration: none;
`;

export const MobileIcon = styled.div`
	display: none;

	@media screen and (max-width: 768px) {
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(-100%, 60%);
		font-size: 1.8rem;
		cursor: pointer;
		color: #fff;
	}
`;

export const NavMenu = styled.ul`
	display: flex;
	align-items: center;
	justify-content: initial;
	list-style-type: none;

	@media screen and (max-width: 768px) {
		display: none;
	}
`;

export const NavItem = styled.li`
	height: 80px;
`;

export const NavLinks = styled(Link)`
	color: #fff;
	display: flex;
	align-items: center;
	text-decoration: none;
	padding: 0 1rem;
	height: 100%;
	cursor: pointer;
	&:hover {
		color: #a72d83;
	}
`;

export const NavButton = styled.nav`
	display: flex;
	align-items: center;

	@media screen and (max-width: 768px) {
		display: none;
	}
`;

export const NavCartButton = styled.nav`
	display: flex;
	align-items: center;

	@media screen and (max-width: 768px) {
		margin-right: 10px;
	}
`;

export const NavBtn = styled.button`
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

	&:hover {
		transition: all 0.2s ease-in-out;
		background: #fff;
		color: #010606;
	}
`;

export const Logo = styled.img`
	width: 60px;
	height: 30px;
	margin-right: 5px;
`;
