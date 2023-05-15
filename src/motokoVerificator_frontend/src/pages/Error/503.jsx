import { ErrorCodeContainer, ErrorCodeNumber, ErrorCodeNumberContainer, ErrorCodeTitle, ErrorContainer, ErrorDataContainer, ErrorText } from "@layout/errorElements";
import React from "react";

const Error503 = () => {
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
				</ErrorDataContainer>
			</ErrorContainer>
		</>
	);
};

export default Error503;
