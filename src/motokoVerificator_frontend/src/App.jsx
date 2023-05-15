import React, { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

import Router from "@routes/routes.jsx";

/*
	Helper component that prevent use links inside the app
	and get the component with the last scroll position
*/
const Wrapper = ({ children }) => {
	const location = useLocation();
	useLayoutEffect(() => {
		document.documentElement.scrollTo(0, 0);
	}, [location.pathname]);
	return children;
};

const App = () => {
	return (
		<Wrapper>
			<Router />
		</Wrapper>
	);
};

export default App;
