import React from "react";
import Select from "react-select";
import fetch from "isomorphic-fetch";
import "react-select/dist/react-select.css";

class UsersClear extends React.Component {
	constructor() {
		super();
		this.state = {
			backspaceRemoves: true,
			multi: false,
			creatable: true
		};
	}

	onChange = (value) => {
		this.setState({
			value: value
		});
	};

	getUsers = (input) => {
		if (!input) {
			return Promise.resolve({ options: [] });
		}

		return fetch(`https://api.github.com/search/users?q=${input}`).then((response) => response.json()).then((json) => {
			return { options: json.items };
		});
	};

	gotoUser = (value, event) => {
		window.open(value.html_url);
	};

	render() {
		const AsyncComponent = this.state.creatable ? Select.AsyncCreatable : Select.Async;
		console.log(this.state.value);
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label} </h3>
				<AsyncComponent
					multi={this.state.multi}
					value={this.state.value}
					onChange={this.onChange}
					valueKey="id"
					labelKey="login"
					loadOptions={this.getUsers}
					backspaceRemoves={this.state.backspaceRemoves}
				/>
			</div>
		);
	}
}

export default UsersClear;
