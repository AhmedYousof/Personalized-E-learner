import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

class CourseInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
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
    const path = window.location.pathname.split("/");
    const courseId = path[3];
    console.log(courseId);

    axios.get(`/api/learner/course-info/${courseId}`).then((res) => {
      const course = res.data;
      this.setState({ course });
      console.log(course);
    });
  }

  render() {
    const { user, course } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            {course[0] !== undefined ? (
              <div className="m-3">
                <h2 className="bg-warning text-white text-bold">
                  {course[0].course}
                </h2>
                <img
                  className="img-thumbnail rounded"
                  src="https://elearningindustry.com/wp-content/uploads/2020/12/how-to-improve-your-elearning-course-cover-design.png"
                  alt="Course"
                />
                <div className="col-md-10 text-left m-3">
                  <h3 className="m-2">
                    {" "}
                    <i className="text-info">Course Field: </i>{" "}
                    {course[0].courseField}{" "}
                  </h3>

                  <h3 className="m-2">
                    {" "}
                    <i className="text-info">Instructor: </i>{" "}
                    {course[0].instructorName}{" "}
                  </h3>

                  <h3 className="m-2">
                    {" "}
                    <i className="text-info">Join date: </i>{" "}
                    {moment(course[0].date).format("MMMM Do YYYY, h:mm:ss a")}{" "}
                  </h3>
                  <h3 className="m-2">
                    {" "}
                    <i className="text-info syllabus-head">
                      Syllabus:{" "}
                      <i className="syllabus-head-info">
                        (Syllabus choosen depends on your personality traits)
                      </i>
                    </i>{" "}
                    <ul className="list-group syllabus-ul">
                      {course[0].syllabus.map((syl, i) => (
                        <li className="list-group-item syllabus-li">
                          <h3>
                            {i + 1}. {syl.name}
                          </h3>
                        </li>
                      ))}{" "}
                    </ul>
                  </h3>
                </div>
              </div>
            ) : (
              <h1>Page Not found...</h1>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CourseInfo;
