import React from "react";
import styled from "styled-components";
import { FadingDots } from "react-cssfx-loading";

const LoadingOverlay = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const LoadingContainer = styled.div`
	display: flex;
	text-align: center;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Loading = () => {
	return (
		<LoadingOverlay>
			<LoadingContainer>
				<FadingDots color="#a72d83" />
			</LoadingContainer>
		</LoadingOverlay>
	);
};

export default Loading;
