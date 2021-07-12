import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import isEmpty from "../../validation/is-empty";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      email: "",
      password: "",
      isAuthenticated: false,
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("/api/login", userData)
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        this.setState({ isAuthenticated: !isEmpty(decoded), user: decoded });
        window.location.assign("/");
      })
      .catch((err) => {
        if (err.response) this.setState({ errors: err.response.data });
      });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="p-3">
        <h2 className="m-5 text-info">Login</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group p-1">
            <input
              type="email"
              onChange={this.onChange}
              className={classnames("form-control", {
                "is-invalid": errors.email,
              })}
              placeholder="Enter your email...."
              name="email"
              value={this.state.email}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="form-group p-1">
            <input
              type="password"
              onChange={this.onChange}
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.password,
              })}
              placeholder="Enter your password...."
              name="password"
              value={this.state.password}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <input
            type="submit"
            className="btn btn-info btn-block mt-4"
            value="Login now"
          />
        </form>
      </div>
    );
  }
}

export default Login;
