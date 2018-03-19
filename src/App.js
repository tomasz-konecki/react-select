import React, { Component } from "react";
import "./App.css";
import UsersClear from "./components/UsersClear";

class App extends React.Component {
	render() {
		console.table(this.state);
		return (
			<div>
				<UsersClear />
			</div>
		);
	}
}

export default App;
