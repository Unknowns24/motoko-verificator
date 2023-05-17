import React from "react";
import { useAuth } from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarButton, SidebarRoute } from "./SidebarElements";

const Sidebar = ({ isOpen, toggle }) => {
	const { isAuthenticated, logout, login } = useAuth();
	const navigate = useNavigate();

	return (
		<>
			<SidebarContainer isOpen={isOpen} onClick={toggle}>
				<Icon onClick={toggle}>
					<CloseIcon />
				</Icon>
				<SidebarWrapper>
					{isAuthenticated === false ? (
						<SideBtnWrap>
							<SidebarButton
								onClick={() => {
									toggle();
									login(navigate);
								}}
							>
								Login
							</SidebarButton>
						</SideBtnWrap>
					) : (
						""
					)}

					{isAuthenticated === true ? (
						<>
							<SidebarMenu>
								<SidebarLink to="/" onClick={toggle}>
									Home
								</SidebarLink>
								<SidebarLink to="/verificator/" onClick={toggle}>
									Works
								</SidebarLink>
								<SidebarLink to="/profile" onClick={toggle}>
									Profile
								</SidebarLink>
							</SidebarMenu>
							<SideBtnWrap>
								<SidebarButton
									onClick={() => {
										toggle();
										logout(navigate);
									}}
								>
									Logout
								</SidebarButton>
							</SideBtnWrap>
						</>
					) : (
						""
					)}
				</SidebarWrapper>
			</SidebarContainer>
		</>
	);
};

export default Sidebar;
