import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";
//import isEmpty from "../validation/is-empty";

class addCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      syllabus: "",
      field: "",
      instructor: "",
      instructor_id: "",
      syllabus1_name: "",
      syllabus1_way: "",
      syllabus2_name: "",
      syllabus2_way: "",
      syllabus3_name: "",
      syllabus3_way: "",
      syllabus4_name: "",
      syllabus4_way: "",
      syllabus5_name: "",
      syllabus5_way: "",
      syllabus6_name: "",
      syllabus6_way: "",
      syllabus7_name: "",
      syllabus7_way: "",
      errors: {},
      user: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    axios.get("/api/users/profile").then((res) => {
      const user = res.data;
      this.setState({ user });
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const courseData = {
      name: this.state.name,
      field: this.state.field,
      cost: this.state.cost,
      syllabus: {
        name1: this.state.syllabus1_name,
        learningWay1: this.state.syllabus1_way,
        name2: this.state.syllabus2_name,
        learningWay2: this.state.syllabus2_way,
        name3: this.state.syllabus3_name,
        learningWay3: this.state.syllabus3_way,
        name4: this.state.syllabus4_name,
        learningWay4: this.state.syllabus4_way,
        name5: this.state.syllabus5_name,
        learningWay5: this.state.syllabus5_way,
        name6: this.state.syllabus6_name,
        learningWay6: this.state.syllabus6_way,
        name7: this.state.syllabus7_name,
        learningWay7: this.state.syllabus7_way,
      },
    };
    axios
      .post("/api/instructor/add-course", courseData)
      .then((res) => {
        //const course = res.data;
        window.location.reload();
      })
      .catch((err) => {
        if (err.response) this.setState({ errors: err.response.data });
      });
  }

  render() {
    const ways = [
      "Imagination",
      "Extraversion",
      "Emotional Stability",
      "Agreeableness",
      "Conscientiousness",
    ];
    const waySigns = ["N", "E", "O", "A", "C"];
    const { errors, user } = this.state;
    let content;
    if (user.isInstructor === true) {
      content = (
        <form onSubmit={this.onSubmit}>
          <h2 className="m-5 text-info">Add Course</h2>

          <div className="form-group p-1">
            <input
              type="text"
              onChange={this.onChange}
              className={classnames("form-control", {
                "is-invalid": errors.name,
              })}
              placeholder="Enter the course name...."
              name="name"
              value={this.state.name}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
          <div className="form-group p-1">
            <input
              type="text"
              onChange={this.onChange}
              className={classnames("form-control", {
                "is-invalid": errors.field,
              })}
              placeholder="Enter the field name...."
              name="field"
              value={this.state.field}
            />
            {errors.field && (
              <div className="invalid-feedback">{errors.field}</div>
            )}
          </div>
          <div className="form-group p-1">
            <input
              type="text"
              onChange={this.onChange}
              className="form-control"
              placeholder="Enter Syllabus1 name...."
              name="syllabus1_name"
              value={this.state.syllabus1_name}
            />
          </div>
          <div className="form-group p-1">
            <select
              name="syllabus1_way"
              value={this.state.syllabus1_way}
              className="custom-select custom-select-lg"
              onChange={this.onChange}
            >
              <option selected value="">
                Choose the most relative personality type to take syllabus1
              </option>
              {ways.map((way, i) => (
                <option key={way._id} value={waySigns[i]}>
                  {way}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group p-1">
            <input
              type="text"
              onChange={this.onChange}
              className="form-control"
              placeholder="Enter Syllabus2 name...."
              name="syllabus2_name"
              value={this.state.syllabus2_name}
            />
          </div>
          <div className="form-group p-1">
            <select
              name="syllabus2_way"
              value={this.state.syllabus2_way}
              className="custom-select custom-select-lg"
              onChange={this.onChange}
            >
              <option selected value="">
                Choose the most relative personality type to take syllabus2
              </option>
              {ways.map((way, i) => (
                <option key={way._id} value={waySigns[i]}>
                  {way}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group p-1">
            <input
              type="text"
              onChange={this.onChange}
              className="form-control"
              placeholder="Enter Syllabus3 name...."
              name="syllabus3_name"
              value={this.state.syllabus3_name}
            />
          </div>
          <div className="form-group p-1">
            <select
              name="syllabus3_way"
              value={this.state.syllabus3_way}
              className="custom-select custom-select-lg"
              onChange={this.onChange}
            >
              <option selected value="">
                Choose the most relative personality type to take syllabus3
              </option>
              {ways.map((way, i) => (
                <option key={way._id} value={waySigns[i]}>
                  {way}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group p-1">
            <input
              type="text"
              onChange={this.onChange}
              className="form-control"
              placeholder="Enter Syllabus4 name...."
              name="syllabus4_name"
              value={this.state.syllabus4_name}
            />
          </div>
          <div className="form-group p-1">
            <select
              name="syllabus4_way"
              value={this.state.syllabus4_way}
              className="custom-select custom-select-lg"
              onChange={this.onChange}
            >
              <option selected value="">
                Choose the most relative personality type to take syllabus4
              </option>
              {ways.map((way, i) => (
                <option key={way._id} value={waySigns[i]}>
                  {way}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group p-1">
            <input
              type="text"
              onChange={this.onChange}
              className="form-control"
              placeholder="Enter Syllabus5 name...."
              name="syllabus5_name"
              value={this.state.syllabus5_name}
            />
          </div>
          <div className="form-group p-1">
            <select
              name="syllabus5_way"
              value={this.state.syllabus5_way}
              className="custom-select custom-select-lg"
              onChange={this.onChange}
            >
              <option selected value="">
                Choose the most relative personality type to take syllabus5
              </option>
              {ways.map((way, i) => (
                <option key={way._id} value={waySigns[i]}>
                  {way}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group p-1">
            <input
              type="text"
              onChange={this.onChange}
              className="form-control"
              placeholder="Enter Syllabus6 name...."
              name="syllabus6_name"
              value={this.state.syllabus6_name}
            />
          </div>
          <div className="form-group p-1">
            <select
              name="syllabus6_way"
              value={this.state.syllabus6_way}
              className="custom-select custom-select-lg"
              onChange={this.onChange}
            >
              <option selected value="">
                Choose the most relative personality type to take syllabus6
              </option>
              {ways.map((way, i) => (
                <option key={way._id} value={waySigns[i]}>
                  {way}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group p-1">
            <input
              type="text"
              onChange={this.onChange}
              className="form-control"
              placeholder="Enter Syllabus7 name...."
              name="syllabus7_name"
              value={this.state.syllabus7_name}
            />
          </div>
          <div className="form-group p-1">
            <select
              name="syllabus7_way"
              value={this.state.syllabus7_way}
              className="custom-select custom-select-lg"
              onChange={this.onChange}
            >
              <option selected value="">
                Choose the most relative personality type to take syllabus7
              </option>
              {ways.map((way, i) => (
                <option key={way._id} value={waySigns[i]}>
                  {way}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group p-1">
            <input
              type="Number"
              onChange={this.onChange}
              className={classnames("form-control", {
                "is-invalid": errors.cost,
              })}
              placeholder="How much this course will cost...."
              name="cost"
              value={this.state.cost}
            />
            {errors.cost && (
              <div className="invalid-feedback">{errors.cost}</div>
            )}
          </div>

          <input
            type="submit"
            className="btn btn-info btn-block mt-4"
            value="submit"
          />
        </form>
      );
    } else {
      content = (
        <div className="align-items-center">
          <h1 className="pt-5 text-warning">
            You are not allowed to enter this page...
          </h1>
        </div>
      );
    }
    return <div>{content}</div>;
  }
}

export default addCourse;
