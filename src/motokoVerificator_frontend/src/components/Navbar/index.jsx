import React from "react";
import { FaBars } from "react-icons/fa";
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, Logo, NavButton, NavBtn } from "./NavbarElements";
import { useAuth } from "@hooks/useAuth";
import LogoImg from "@images/logo.png";

const Navbar = ({ toggle }) => {
	const { isAuthenticated, logout, login } = useAuth();

	return (
		<>
			<Nav>
				<NavbarContainer>
					<NavLogo to="/">
						<Logo src={LogoImg} alt="logo" />
					</NavLogo>
					<MobileIcon onClick={toggle}>
						<FaBars />
					</MobileIcon>
					{isAuthenticated ? (
						<>
							<NavMenu>
								<NavItem>
									<NavLinks to="/">Home</NavLinks>
								</NavItem>
								<NavItem>
									<NavLinks to="/verificator">Works</NavLinks>
								</NavItem>
								<NavItem>
									<NavLinks to="/profile">Profile</NavLinks>
								</NavItem>
							</NavMenu>

							<NavButton>
								<NavBtn onClick={logout}>Logout</NavBtn>
							</NavButton>
						</>
					) : (
						<NavButton>
							<NavBtn onClick={login}>Login</NavBtn>
						</NavButton>
					)}
				</NavbarContainer>
			</Nav>
		</>
	);
};

export default Navbar;

/*
	{!auth && (window.location.pathname === "/" || window.location.pathname === "/signup") ? (
						<NavButton>
							<NavBtnLink to="/signin">Sign In</NavBtnLink>
						</NavButton>
					) : (
						""
					)}

					{!auth && window.location.pathname === "/signin" ? (
						<NavButton>
							<NavBtnLink to="/signup">Sign Up</NavBtnLink>
						</NavButton>
					) : (
						""
					)}

					{auth ? (
						<NavButton>
							<NavBtnLink to="/panel/dashboard">Customer Area</NavBtnLink>
						</NavButton>
					) : (
						""
					)}
*/
