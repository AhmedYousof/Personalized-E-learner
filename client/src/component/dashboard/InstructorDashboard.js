import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class InstructorDashboard extends Component {
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
  onAcceptClick(courseId, learnerId, waitingId) {
    axios
      .post(
        `/api/instructor/aprove-learner/${courseId}/${learnerId}/${waitingId}`
      )
      .then((res) => {
        const courses = res.data;
        this.setState({ courses });
      })
      .catch((err) => console.log(err));
    window.location.reload();
  }

  onRefuseClick(courseId, learnerId, waitingId) {
    axios
      .post(
        `/api/instructor/refuse-learner/${courseId}/${learnerId}/${waitingId}`
      )
      .then((res) => {
        const courses = res.data;
        this.setState({ courses });
      })
      .catch((err) => console.log(err));
    window.location.reload();
  }

  onRemoveClick(courseId, learnerId) {
    axios
      .post(`/api/instructor/remove-learner/${courseId}/${learnerId}`)
      .then((res) => {
        const courses = res.data;
        this.setState({ courses });
      })
      .catch((err) => console.log(err));
    window.location.reload();
  }

  render() {
    const { courses, user } = this.state;

    const newCourses = courses.filter(
      (course) => course.instructor.id === user.id
    );

    return (
      <div className="col-sm-12">
        <h2 className="text-left m-2">
          Welcome <span className="text-info">{user.name}</span>,{" "}
          <h5 className="mt-3 mb-3"> Manage your courses comfortably here</h5>
          <Link
            to="/instructor/add-course"
            className="btn btn-success text-right"
          >
            Add new course
          </Link>
        </h2>

        {newCourses.map((course) => (
          <div>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th>Course name</th>
                  <th>field</th>
                  <th>course cost</th>
                  <th>number of learners</th>
                  <th>learners</th>
                  <th>number of waitings</th>
                  <th>waitings</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <b className="text-info">{course.name}</b>
                  </td>
                  <td className="text-info">
                    <b>{course.field}</b>
                  </td>
                  <td className="text-warning">
                    <b>{course.cost}</b>
                  </td>
                  <td>{course.learners.length}</td>
                  <td>
                    {course.learners.map((learner) => (
                      <p className="col">
                        {learner.name}
                        <div className="btn-group ">
                          <button
                            className="btn btn-sm btn-danger mr-2 ml-2"
                            onClick={this.onRemoveClick.bind(
                              this,
                              course._id,
                              learner.learnerId
                            )}
                          >
                            remove
                          </button>
                        </div>
                      </p>
                    ))}
                  </td>
                  <td>{course.waitings.length}</td>

                  <td>
                    {course.waitings.map((waiting) => (
                      <p className="col">
                        {waiting.name}
                        <div className="btn-group ">
                          <button
                            className="btn btn-sm btn-success ml-2"
                            onClick={this.onAcceptClick.bind(
                              this,
                              course._id,
                              waiting.learner,
                              waiting._id
                            )}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-sm btn-danger ml-2"
                            onClick={this.onRefuseClick.bind(
                              this,
                              course._id,
                              waiting.learner,
                              waiting._id
                            )}
                          >
                            refuse
                          </button>
                        </div>
                      </p>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  }
}

export default InstructorDashboard;
