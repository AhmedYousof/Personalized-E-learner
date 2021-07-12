import React, { Component } from "react";
import axios from "axios";
import isEmpty from "../../validation/is-empty";
import { Link } from "react-router-dom";
import InsructorDashboard from "./InstructorDashboard";
import LearnerDashboard from "./LearnerDashboard";

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      user: {},
      recommended: [],
      isAuthenticated: false,
      waiting: false,
    };
  }

  componentDidMount() {
    axios.get("/api/current").then((res) => {
      const user = res.data;

      this.setState({
        user: user,
        isAuthenticated: !isEmpty(user),
      });
    });

    axios.get("/api/courses").then((res) => {
      const courses = res.data;
      this.setState({ courses });
    });
  }

  render() {
    const { user, isAuthenticated } = this.state;
    let content;

    if (isAuthenticated === false) {
      content = (
        <div className="col-sm-12">
          <div class="jumbotron mt-4" style={{ backgroundColor: "#FFF5DB" }}>
            <h1 className="mt-2">P-Elearning</h1>
            <p>
              <h4 style={{ fontWeight: "400" }}>
                Have a deeply personalized learning experience, Created for you
                only
              </h4>
            </p>
            <hr />
            <Link to="/register" className="btn btn-lg btn-info mr-2">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-lg btn-light">
              Login
            </Link>
          </div>
        </div>
      );
    } else {
      if (user.quizDone === false) {
        content = (
          <div className="container" style={{ marginBottom: "200px" }}>
            <h3 className="" style={{ margin: "50px" }}>
              {" "}
              Welcome to P-Elearning{" "}
            </h3>
            <h4 className="text-info" style={{ margin: "40px" }}>
              Perform your personality test in order to start your personalized
              learning journey with us...
            </h4>
            <Link
              to="/assessment/personality-test"
              className="btn btn-lg btn-success"
              style={{ margin: "30px" }}
            >
              Start personality test..
            </Link>
          </div>
        );
      } else if (user.quizDone === true) {
        if (user.role === "learner") {
          content = <LearnerDashboard />;
        }
        if (user.role === "instructor") {
          content = <InsructorDashboard />;
        }
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center align-items-center">
              <div className="">{content}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Courses;
