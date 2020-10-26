/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { fetchLoginAPI, validLoginData } from "../action";
import { composeWithDevTools } from "redux-devtools-extension";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  handleLoginClick(event, email, password) {
    event.preventDefault();
    fetchLoginAPI(email, password).then((success) => {
      if (success) {
        this.props.history.push("/admin/food-page");
      } else {
        alert("Wrong user!");
      }
    });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <form
        className="logcontainer"
        onSubmit={(event) =>
          this.handleLoginClick(event, this.state.email, this.state.password)
        }
      >
        <p>The Login Page</p>
        <div>
          <Field
            className="inputs"
            name="email"
            placeholder="Email"
            id="email"
            type="text"
            component="input"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
        </div>
        <div>
          <Field
            className="inputs"
            type="password"
            name="password"
            component="input"
            id="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </div>
        <input
          type="submit"
          id="login"
          value=" Login"
          disabled={!validLoginData(this.state.email, this.state.password)}
        />
      </form>
    );
  }
}

LoginPage = reduxForm({
  form: "login",
})(LoginPage);
