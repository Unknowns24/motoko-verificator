import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthRoute, RegisteredRoute } from "@validations/RoutesValidation";

import Home from "@pages/Home";
import Verificator from "@pages/Verificator";
import Profile from "@pages/Profile";
import Error404 from "@pages/Error/404";
import User from "@pages/User";

const Router = () => {
	return (
		<Routes>
			<Route path="/" exact element={<Home />} />
			<Route
				path="/verificator"
				element={
					<AuthRoute>
						<RegisteredRoute>
							<Verificator />
						</RegisteredRoute>
					</AuthRoute>
				}
			/>
			<Route
				path="/profile"
				exact
				element={
					<AuthRoute>
						<RegisteredRoute>
							<Profile />
						</RegisteredRoute>
					</AuthRoute>
				}
			/>
			<Route
				path="/user"
				exact
				element={
					<AuthRoute>
						<User />
					</AuthRoute>
				}
			/>
			<Route path="*" element={<Error404 />} />
		</Routes>
	);
};

export default Router;
