import { Component } from "react";

import "./index.css";

class Login extends Component {
  state = { username: "", password: "", errorMsg: "" };

  onChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  onChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  onSuccessLogin = () => {
    const { history } = this.props;
    console.log(history);
    history.replace("/");
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const apiUrl = "https://apis.ccbp.in/login";
    const userDetails = {
      username,
      password,
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
      this.onSuccessLogin();
    } else {
      this.setState({ errorMsg: data.error_msg });
    }
  };

  render() {
    const { username, password, errorMsg } = this.state;
    const showErrorMsg = errorMsg !== "";
    return (
      <div className="login-box-container">
        <div className="login-container">
          <div className="login-logo-container">
            <img
              src="https://images.app.goo.gl/Ltfu93fv4sKDTTWLA"
              alt="website logo"
              className="login-logo"
            />
            <h1>Login</h1>
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
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="input"
              placeholder="Password"
              onChange={this.onChangePassword}
              value={password}
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
