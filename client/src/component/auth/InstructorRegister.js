import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";
import { Link } from "react-router-dom";

class InstructorRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
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
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmpassword: this.state.confirmPassword,
    };
    axios
      .post("/api/instructor/register", userData)
      .then((res) => {
        const user = res.data;
        this.setState({ user });
        window.location.assign("/login");
      })
      .catch((err) => {
        if (err.response) this.setState({ errors: err.response.data });
      });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="p-3">
        <h2 className="m-5 text-info">Register As an Instructor</h2>
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
              type="text"
              onChange={this.onChange}
              className={classnames("form-control", {
                "is-invalid": errors.name,
              })}
              placeholder="Enter your name...."
              name="name"
              value={this.state.name}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
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
          <div className="form-group p-1">
            <input
              type="password"
              onChange={this.onChange}
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.confirmpassword,
              })}
              placeholder="Confirm your password...."
              name="confirmPassword"
              value={this.state.confirmPassword}
            />
            {errors.confirmpassword && (
              <div className="invalid-feedback">{errors.confirmpassword}</div>
            )}
          </div>
          <input
            type="submit"
            className="btn btn-info btn-block mt-4"
            value="Register now"
          />
        </form>
        <div className="pt-4 ">
          <Link to="/learner/register" className="btn  btn-link">
            Register as a learner instead!..
          </Link>
        </div>
      </div>
    );
  }
}

export default InstructorRegister;
