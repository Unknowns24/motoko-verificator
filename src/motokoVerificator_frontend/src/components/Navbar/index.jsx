import React from "react";
import { FaBars } from "react-icons/fa";
import { useAuth } from "@hooks/useAuth";
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, Logo, NavButton, NavBtn } from "./NavbarElements";
import { useNavigate } from "react-router-dom";
import LogoImg from "@images/dlogo.png";

const Navbar = ({ toggle }) => {
	const { isAuthenticated, logout, login } = useAuth();
	const navigate = useNavigate();

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
								<NavBtn onClick={() => logout(navigate)}>Logout</NavBtn>
							</NavButton>
						</>
					) : (
						<NavButton>
							<NavBtn onClick={() => login(navigate)}>Login</NavBtn>
						</NavButton>
					)}
				</NavbarContainer>
			</Nav>
		</>
	);
};

export default Navbar;
