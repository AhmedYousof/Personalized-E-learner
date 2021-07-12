import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import isEmpty from "../../validation/is-empty";
import setAuthToken from "../../utils/setAuthToken";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isAuthenticated: false,
    };

    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  componentDidMount() {
    axios.get("/api/current").then((res) => {
      const user = res.data;
      this.setState({ user: user, isAuthenticated: !isEmpty(user) });
    });
  }
  onLogoutClick() {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    this.setState({ user: {}, isAuthenticated: false });
    window.location.reload();
  }
  render() {
    const { user, isAuthenticated } = this.state;
    let content;

    if (isAuthenticated) {
      content = (
        <div className="container">
          <Link
            className="navbar-brand text-info pr-3"
            to="/"
            style={{ fontWeight: 500 }}
          >
            P-ELearning
          </Link>
          {user.role === "learner" ? (
            <Link
              to="/learner/myCourses"
              className="navbar-text text-info navbar-nav m-2"
            >
              My Courses
            </Link>
          ) : null}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mobile-nav">
            <nav className="navbar navbar-expand-sm ml-auto">
              <span className="navbar-text m-2">
                <img src={user.avatar} alt="" style={{ width: "40px" }} />
              </span>
              <Link to="/users/profile" className="text-info mr-2">
                {user.name}
              </Link>
              <button
                onClick={this.onLogoutClick}
                className="btn btn-link text-danger"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      );
    } else {
      content = (
        <div className="container">
          <Link
            className="navbar-brand text-info pr-3"
            to="/"
            style={{ fontWeight: 500 }}
          >
            P-ELearning
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      );
    }

    return (
      <div>
        <nav
          className="navbar navbar navbar-light navbar-expand-lg "
          style={{ backgroundColor: "#FFF5DB" }}
        >
          {content}
        </nav>
      </div>
    );
  }
}

export default Navbar;
