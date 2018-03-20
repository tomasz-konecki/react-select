import React from "react";
import Select from "react-select";
import fetch from "isomorphic-fetch";
import "react-select/dist/react-select.css";
import "./UserClear.css";
import axios from "axios";

const API_ENDPOINT = "http://10.24.14.148";

class UsersClear extends React.Component {
  constructor() {
    super();
    this.state = {
      backspaceRemoves: true,
      multi: false,
      creatable: true
    };
  }

  onChange = value => {
    this.setState({
      value: value
    });
  };

  getUsers = input => {
    if (!input) {
      return Promise.resolve({ options: [] });
    }

    // return fetch(`https://api.github.com/search/users?q=${input}`)
    return axios
      .get(`${API_ENDPOINT}/users/searchAD/${input}`)
      .then(response => {
        console.log(response.data.dtoObjects);
        return { options: response.data.dtoObjects };
      });
  };

  // gotoUser = (value, event) => {
  //   window.open(value.html_url);
  // };

  render() {
    const AsyncComponent = this.state.creatable
      ? Select.AsyncCreatable
      : Select.Async;
    console.log(this.state.value);
    return (
      <div className="section">
        <h3 className="section-heading">React-select</h3>
        <AsyncComponent
          multi={this.state.multi}
          value={this.state.value}
          onChange={this.onChange}
          valueKey="lastName"
          labelKey="fullName"
          loadOptions={this.getUsers}
          backspaceRemoves={this.state.backspaceRemoves}
        />
      </div>
    );
  }
}

export default UsersClear;
