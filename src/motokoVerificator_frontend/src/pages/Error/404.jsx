import { ErrorCodeContainer, ErrorCodeNumber, ErrorCodeNumberContainer, ErrorCodeTitle, ErrorContainer, ErrorDataContainer, ErrorText } from "@layout/errorElements";
import React from "react";

const Error404 = () => {
	return (
		<>
			<ErrorContainer className="unselectable">
				<ErrorDataContainer>
					<ErrorCodeContainer>
						<ErrorCodeTitle>Oops! Something went wrong!</ErrorCodeTitle>
						<ErrorCodeNumberContainer>
							<ErrorCodeNumber>4</ErrorCodeNumber>
							<ErrorCodeNumber>0</ErrorCodeNumber>
							<ErrorCodeNumber>4</ErrorCodeNumber>
						</ErrorCodeNumberContainer>
					</ErrorCodeContainer>
					<ErrorText>Sorry but the requested page does not exist or is not available for the moment!</ErrorText>
				</ErrorDataContainer>
			</ErrorContainer>
		</>
	);
};

export default Error404;
