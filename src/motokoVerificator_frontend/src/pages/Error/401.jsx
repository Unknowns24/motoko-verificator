import React from "react";
import { useAuth } from "@hooks/useAuth";
import { ErrorCodeContainer, ErrorCodeNumber, ErrorCodeNumberContainer, ErrorCodeTitle, ErrorContainer, ErrorDataContainer, ErrorText, ErrorBtnContainer, ErrorButton } from "@layout/errorElements";

const Error401 = () => {
	const { login } = useAuth();

	return (
		<>
			<ErrorContainer className="unselectable">
				<ErrorDataContainer>
					<ErrorCodeContainer>
						<ErrorCodeTitle>Oops! Something went wrong!</ErrorCodeTitle>
						<ErrorCodeNumberContainer>
							<ErrorCodeNumber>4</ErrorCodeNumber>
							<ErrorCodeNumber>0</ErrorCodeNumber>
							<ErrorCodeNumber>1</ErrorCodeNumber>
						</ErrorCodeNumberContainer>
					</ErrorCodeContainer>
					<ErrorText>Sorry but you need to login before access this page!</ErrorText>
					<ErrorBtnContainer>
						<ErrorButton onClick={login}>Login</ErrorButton>
					</ErrorBtnContainer>
				</ErrorDataContainer>
			</ErrorContainer>
		</>
	);
};

export default Error401;
