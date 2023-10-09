import { Component } from "react";
import { useNavigate } from "react-router-dom";

import "./index.css";

class Login extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    errorMsg: "",
  };

  onChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  onChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  onChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  onChangeConfirmPassword = (event) => {
    this.setState({
      confirmPassword: event.target.value,
    });
  };

  onSuccessSignup = () => {
    const navigate = useNavigate();
    navigate("/", { replace: true });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { username, email, password, confirmPassword } = this.state;
    const apiUrl = "https://apis.ccbp.in/login";
    const userDetails = {
      username,
      email,
      password,
      confirmPassword,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    if (response.ok === true) {
      const jwtToken = data.jwt_token;
      localStorage.setItem("jwt_token", jwtToken);
      this.onSuccessSignup();
    } else {
      this.setState({ errorMsg: data.error_msg });
    }
  };

  render() {
    const { username, email, password, confirmPassword, errorMsg } = this.state;
    const showErrorMsg = errorMsg !== "";
    return (
      <div className="login-box-container">
        <div className="login-container">
          <div className="login-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="login-logo"
            />
            <h1>Signup</h1>
          </div>
          <form className="form-container" onSubmit={this.submitForm}>
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="input"
              placeholder="Username"
              onChange={this.onChangeUsername}
              value={username}
            />
            <label htmlFor="email" className="label">
              EMAIL
            </label>
            <input
              type="text"
              id="email"
              className="input"
              placeholder="Email"
              onChange={this.onChangeEmail}
              value={email}
            />
            <label htmlFor="password" className="label">
              NEW PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="input"
              placeholder="New Password"
              onChange={this.onChangePassword}
              value={password}
            />
            <label htmlFor="confirmPassword" className="label">
              CONFIRM PASSWORD
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="input"
              placeholder="Confirm Password"
              onChange={this.onChangeConfirmPassword}
              value={confirmPassword}
            />
            <button type="submit" className="login-button">
              Signup
            </button>
            {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
