import React from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "@hooks/useAuth";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

//import { motokoVerificator_backend } from "@declarations/motokoVerificator_backend";

const root = createRoot(document.getElementById("app"));

root.render(
	<AuthProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</AuthProvider>
);
