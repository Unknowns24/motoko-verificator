import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import Verificator from "@pages/Verificator";
import Profile from "@pages/Profile";
import Error404 from "@pages/Error/404";

const Router = () => {
	return (
		<Routes>
			<Route path="/" exact element={<Home />} />
			<Route path="/verificator" exact element={<Verificator />} />
			<Route path="/profile" exact element={<Profile />} />
			<Route path="*" element={<Error404 />} />
		</Routes>
	);
};

export default Router;

/*
const MyHello = () => {
	const [name, setName] = React.useState("");
	const [message, setMessage] = React.useState("");

	async function doGreet() {
		const greeting = await motokoVerificator_backend.greet(name);
		setMessage(greeting);
	}

	return (
		<div style={{ fontSize: "30px" }}>
			<div style={{ backgroundColor: "yellow" }}>
				<p>Greetings, from DFINITY!</p>
				<p>
					Type your message in the Name input field, then click <b> Get Greeting</b> to display the result.
				</p>
			</div>
			<div style={{ margin: "30px" }}>
				<input id="name" value={name} onChange={(ev) => setName(ev.target.value)}></input>
				<button onClick={doGreet}>Get Greeting!</button>
			</div>
			<div>
				Greeting is: "<span style={{ color: "green" }}>{message}</span>"
			</div>
		</div>
	);
};
*/
