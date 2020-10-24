import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { fetchLoginAPI, validLoginData } from "../action";
export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }
  handleLoginClick(email, password) {
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
      <div  className="logcontainer">
        <p>The Login Page</p>
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

        <button
          id="login"
          disabled={!validLoginData(this.state.email, this.state.password)}
          onClick={() =>
            this.handleLoginClick(this.state.email, this.state.password)
          }
        >
          Login
        </button>
      </div>
    );
  }
}

LoginPage = reduxForm({
  form: "login"
})(LoginPage);

