import React, { Component } from "react";
import axios from "axios";
import isEmpty from "../../validation/is-empty";
import { Link } from "react-router-dom";

class LearnerCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      user: {},
      waitings: [],
    };
  }
  componentDidMount() {
    axios.get("/api/current").then((res) => {
      const user = res.data;

      this.setState({
        user: user,
        waitings: user.waitings,
        courses: user.learnerCourses,
      });
    });
  }

  render() {
    const { user, waitings, courses } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h2 className="text-left m-2">
              Welcome <span className="text-info">{user.name}</span>,{" "}
              <h5 className="mt-3 mb-3">
                {" "}
                Manage your courses comfortably here
              </h5>
            </h2>

            <hr />
            <h3 className="text-info text-left text-bold">My Courses:</h3>
            {courses.length !== 0 ? (
              <div className="row">
                {courses.map((course) => (
                  <span>
                    {course !== undefined ? (
                      <div className="col-sm-4 p-2">
                        <div
                          key={course._id}
                          className="card"
                          style={{
                            backgroundColor: "whitesmoke",
                            width: "350px",
                          }}
                        >
                          <img
                            className="card-img-top"
                            src="https://elearningindustry.com/wp-content/uploads/2020/12/how-to-improve-your-elearning-course-cover-design.png"
                            alt="Course"
                          />
                          <div className="card-body">
                            <hr />
                            <h4 className=" card-title text-warning">
                              {course.course}
                            </h4>
                            <h4 className="card-text text-info ml-1">
                              {course.courseField}
                            </h4>
                            <strong className="card-text text-info ml-1">
                              <h4 className="">
                                By: {"  "}
                                {course.instructorName}
                              </h4>
                            </strong>
                            <hr />

                            <Link
                              className="btn btn-warning"
                              to={`/learner/course-info/${course.courseId}`}
                            >
                              Go to The Course
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </span>
                ))}
              </div>
            ) : (
              <div className="m-2">
                <h4 className="text-warning">
                  You have not been enrolled in any course Yet
                </h4>
              </div>
            )}
            <hr />
            <h4>Courses waiting for instructor to accept:</h4>

            <div className="row">
              {waitings.map((waiting) => (
                <span>
                  {waiting[0] !== undefined ? (
                    <div className="col-sm-4 p-2">
                      <div
                        key={waiting._id}
                        className="card"
                        style={{
                          backgroundColor: "whitesmoke",
                          width: "350px",
                        }}
                      >
                        <img
                          className="card-img-top"
                          src="https://elearningindustry.com/wp-content/uploads/2020/12/how-to-improve-your-elearning-course-cover-design.png"
                          alt="Course"
                        />
                        <div className="card-body">
                          <h3>
                            <strong className="card-title text-info ml-1">
                              <h4 className="">By: {waiting[0].instructor}</h4>
                            </strong>
                          </h3>
                          <h4 className="card-text text-info">
                            <strong className="card-text text-info ml-1">
                              {waiting[0].field}
                            </strong>
                          </h4>
                          <h4 className=" card-text m-2 text-warning">
                            cost:{" "}
                            <b className="text-left"> {waiting[0].cost}$</b>
                          </h4>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LearnerCourses;
