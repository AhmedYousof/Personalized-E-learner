import React, { Component } from "react";
import axios from "axios";
import isEmpty from "../../validation/is-empty";

class LearnerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      courses: [],
      course: {},
    };
  }
  componentDidMount() {
    axios.get("/api/current").then((res) => {
      const user = res.data;

      this.setState({
        user: user,
      });
    });
    axios.get("/api/courses").then((res) => {
      const courses = res.data;
      this.setState({ courses });
    });
  }

  onModalClick(i, courseId) {
    const { user } = this.state;
    user.courses.map((course) => {
      if (course._id === courseId) {
        this.setState({ waiting: true });
      } else {
        this.setState({ waiting: false });
      }
    });

    if (user.courses[i].length > 0 || user.waitings[i].length > 0) {
      this.setState({ waiting: true });
    } else {
      this.setState({ waiting: false });
    }
  }
  onJoinClick(courseId) {
    axios.post(`/api/learner/join-request/${courseId}`).then((res) => {
      this.setState({ waiting: true });
    });
  }

  render() {
    const { courses, user } = this.state;
    let recommended = [];

    return (
      <div className="row">
        {courses.map((course, i) => (
          <div className="col-sm-12">
            {course.instructor.traits.map((trait) => (
              <div>
                {!isEmpty(user.traits) && user.traits.includes(trait) ? (
                  <div className="">
                    {recommended.indexOf(course) === -1 ? (
                      <div>
                        <input type="hidden" value={recommended.push(course)} />
                      </div>
                    ) : null}{" "}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ))}

        {!isEmpty(recommended) ? (
          <div>
            <h1 className="text-left text-info m-2">Recommended courses</h1>
            <p className="text-left bg-warning">
              The most Recommended courses for you, due to the personality
              similarities between you and the instructors
            </p>
            <div className="row">
              {recommended.map((course, i) => (
                <div className="col-sm-4 course">
                  <div
                    key={course._id}
                    className="card"
                    style={{ backgroundColor: "whitesmoke" }}
                  >
                    {" "}
                    <img
                      className="card-img-top"
                      src="https://elearningindustry.com/wp-content/uploads/2020/12/how-to-improve-your-elearning-course-cover-design.png"
                      alt="Course"
                    />
                    <div className="card-body">
                      <h3>
                        <strong className="card-title text-info ">
                          {course.name}{" "}
                          <h4 className="">By: {course.instructor.name}</h4>
                        </strong>
                      </h3>
                      <h4 className="card-text text-info">
                        <h5 className="card-text text-info ">{course.field}</h5>
                      </h4>
                      <h4 className=" card-text text-warning">
                        cost: <b className="text-left"> {course.cost}$</b>
                      </h4>
                      <button
                        className="btn btn-warning"
                        data-toggle="modal"
                        data-target={`#CourseModal${i}`}
                        onClick={this.onModalClick.bind(this, i, course._id)}
                      >
                        More info
                      </button>
                    </div>
                    <div
                      class="modal fade"
                      aria-hidden="true"
                      tabindex="-1"
                      role="dialog"
                      id={`CourseModal${i}`}
                    >
                      <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h4 class="modal-title text-warning">
                              {course.name}
                            </h4>
                            <button
                              type="button"
                              class="close"
                              data-dismiss="modal"
                            >
                              &times;
                            </button>
                          </div>

                          <div class="modal-body">
                            <h6 className="text-info">
                              By:{" "}
                              <b className="text-warning">
                                {course.instructor.name}
                              </b>
                            </h6>
                            <h6 className="text-info">
                              Course field:{" "}
                              <b className="text-warning">{course.field}</b>{" "}
                            </h6>
                            <hr />
                            <h5 className="text-info border border-info">
                              <b>Syllabus</b>
                            </h5>
                            <h6 className="text-warning text-left">
                              1.{course.syllabus[0].name1}
                            </h6>
                            <h6 className="text-warning text-left">
                              2.{course.syllabus[0].name2}
                            </h6>
                            <h6 className="text-warning text-left">
                              3.{course.syllabus[0].name3}
                            </h6>
                            <h6 className="text-warning text-left">
                              4.{course.syllabus[0].name4}
                            </h6>
                            <h6 className="text-warning text-left">
                              5.{course.syllabus[0].name5}
                            </h6>
                            <h6 className="text-warning text-left">
                              6.{course.syllabus[0].name6}
                            </h6>
                            <h6 className="text-warning text-left">
                              7.{course.syllabus[0].name7}
                            </h6>
                          </div>
                          {this.state.waiting === true ? (
                            <button
                              type="submit"
                              class="btn btn-disabled btn-lg"
                              target="_top"
                              disabled={this.state.waiting}
                            >
                              Already enroled or waiting for instructor
                              aprove...
                            </button>
                          ) : (
                            <button
                              type="submit"
                              onClick={this.onJoinClick.bind(this, course._id)}
                              class="btn btn-info btn-lg"
                              target="_top"
                            >
                              Request to join!
                            </button>
                          )}
                          <div class="modal-footer m-auto">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="container">
            <h1 className="text-left ">Recommended courses.</h1>
            <p className="text-warning row">
              <h3>Working to get you the most recommended ....</h3>
            </p>
          </div>
        )}

        <hr />
        <div className="row">
          <h1 className="text-left text-info col-12 m-2">All courses</h1>

          {courses.map((course, i) => (
            <div className="col-sm-4 course">
              <div
                key={course._id}
                className="card"
                style={{ backgroundColor: "whitesmoke" }}
              >
                {" "}
                <img
                  className="card-img-top"
                  src="https://elearningindustry.com/wp-content/uploads/2020/12/how-to-improve-your-elearning-course-cover-design.png"
                  alt="Course"
                />
                <div className="card-body">
                  <h3>
                    <strong className="card-title text-info ">
                      {course.name}{" "}
                      <h4 className="">By: {course.instructor.name}</h4>
                    </strong>
                  </h3>
                  <h4 className="card-text text-info">
                    <h6 className="card-text text-info ">{course.field}</h6>
                  </h4>
                  <h4 className=" card-text text-warning">
                    cost: <b className="text-left"> {course.cost}$</b>
                  </h4>
                  <button
                    className="btn btn-warning"
                    data-toggle="modal"
                    data-target={`#CourseModal${i}`}
                    onClick={this.onModalClick.bind(this, i, course._id)}
                  >
                    More info
                  </button>
                </div>
                <div
                  class="modal fade"
                  aria-hidden="true"
                  tabindex="-1"
                  role="dialog"
                  id={`CourseModal${i}`}
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h4 class="modal-title text-warning">{course.name}</h4>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                        >
                          &times;
                        </button>
                      </div>

                      <div class="modal-body">
                        <h6 className="text-info">
                          By:{" "}
                          <b className="text-warning">
                            {course.instructor.name}
                          </b>
                        </h6>
                        <h6 className="text-info">
                          Course field:{" "}
                          <h5 className="text-warning">{course.field}</h5>{" "}
                        </h6>
                        <hr />
                        <h5 className="text-info border border-info">
                          <b>Syllabus</b>
                        </h5>
                        <h6 className="text-warning text-left">
                          1.{course.syllabus[0].name1}
                        </h6>
                        <h6 className="text-warning text-left">
                          2.{course.syllabus[0].name2}
                        </h6>
                        <h6 className="text-warning text-left">
                          3.{course.syllabus[0].name3}
                        </h6>
                        <h6 className="text-warning text-left">
                          4.{course.syllabus[0].name4}
                        </h6>
                        <h6 className="text-warning text-left">
                          5.{course.syllabus[0].name5}
                        </h6>
                        <h6 className="text-warning text-left">
                          6.{course.syllabus[0].name6}
                        </h6>
                        <h6 className="text-warning text-left">
                          7.{course.syllabus[0].name7}
                        </h6>
                      </div>
                      {this.state.waiting === true ? (
                        <button
                          type="submit"
                          class="btn btn-disabled btn-lg"
                          target="_top"
                          disabled={this.state.waiting}
                        >
                          Already enroled or waiting for instructor aprove...
                        </button>
                      ) : (
                        <button
                          type="submit"
                          onClick={this.onJoinClick.bind(this, course._id)}
                          class="btn btn-info btn-lg"
                          target="_top"
                        >
                          Request to join!
                        </button>
                      )}

                      <div class="modal-footer m-auto">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default LearnerDashboard;
