import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";
//import isEmpty from "../validation/is-empty";

class AddQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      key: "",
      domain: "",
      answer1: "",
      answer2: "",
      answer4: "",
      answer5: "",
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
    const quizData = {
      question: this.state.question,
      key: this.state.key,
      domain: this.state.domain,
      answer1: this.state.answer1,
      answer2: this.state.answer2,
      answer3: this.state.answer3,
      answer4: this.state.answer4,
      answer5: this.state.answer5,
    };
    axios
      .post("/api/admin/add-quiz", quizData)
      .then((res) => {
        const quiz = res.data;
        window.location.reload();
      })
      .catch((err) => {
        if (err.response) this.setState({ errors: err.response.data });
      });
  }

  render() {
    const domains = ["N", "E", "O", "A", "C"];
    const keys = ["+", "-"];
    const { errors } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <h2 className="m-5 text-info">Add personality question</h2>

          <div className="form-group p-1">
            <input
              type="text"
              onChange={this.onChange}
              className={classnames("form-control", {
                "is-invalid": errors.question,
              })}
              placeholder="Enter the question...."
              name="question"
              value={this.state.question}
            />
            {errors.question && (
              <div className="invalid-feedback">{errors.question}</div>
            )}
          </div>
          <div className="form-group p-1">
            <select
              name="domain"
              value={this.state.domain}
              className={classnames("custom-select custom-select-lg", {
                "is-invalid": errors.domain,
              })}
              onChange={this.onChange}
            >
              <option selected value="">
                Select the domain
              </option>
              {domains.map((domain) => (
                <option key={domain._id} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
            {errors.domain && (
              <div className="invalid-feedback">{errors.domain}</div>
            )}
          </div>
          <div className="form-group p-1">
            <select
              name="key"
              value={this.state.key}
              className={classnames("custom-select custom-select-lg", {
                "is-invalid": errors.key,
              })}
              onChange={this.onChange}
            >
              <option selected value="">
                Choose the Key
              </option>
              {keys.map((key) => (
                <option key={key._id} value={key}>
                  {key}
                </option>
              ))}
            </select>
            {errors.key && <div className="invalid-feedback">{errors.key}</div>}
          </div>
          <div className="form-group p-1">
            <input
              type="number"
              onChange={this.onChange}
              className={classnames("form-control", {
                "is-invalid": errors.answer1,
              })}
              placeholder="Enter the answer1...."
              name="answer1"
              value={this.state.answer1}
            />
            {errors.answer1 && (
              <div className="invalid-feedback">{errors.answer1}</div>
            )}
          </div>
          <div className="form-group p-1">
            <input
              type="number"
              onChange={this.onChange}
              className={classnames("form-control", {
                "is-invalid": errors.answer2,
              })}
              placeholder="Enter the answer2...."
              name="answer2"
              value={this.state.answer2}
            />
            {errors.answer2 && (
              <div className="invalid-feedback">{errors.answer2}</div>
            )}
          </div>
          <div className="form-group p-1">
            <input
              type="number"
              onChange={this.onChange}
              className={classnames("form-control", {
                "is-invalid": errors.answer3,
              })}
              placeholder="Enter the answer3...."
              name="answer3"
              value={this.state.answer3}
            />
            {errors.answer3 && (
              <div className="invalid-feedback">{errors.answer3}</div>
            )}
          </div>

          <div className="form-group p-1">
            <input
              type="number"
              onChange={this.onChange}
              className={classnames("form-control", {
                "is-invalid": errors.answer4,
              })}
              placeholder="Enter the answer4...."
              name="answer4"
              value={this.state.answer4}
            />
            {errors.answer4 && (
              <div className="invalid-feedback">{errors.answer4}</div>
            )}
          </div>

          <div className="form-group p-1">
            <input
              type="number"
              onChange={this.onChange}
              className={classnames("form-control", {
                "is-invalid": errors.answer5,
              })}
              placeholder="Enter the answer5...."
              name="answer5"
              value={this.state.answer5}
            />
            {errors.answer5 && (
              <div className="invalid-feedback">{errors.answer5}</div>
            )}
          </div>
          <input
            type="submit"
            className="btn btn-info btn-block mt-4"
            value="submit"
          />
        </form>
      </div>
    );
  }
}

export default AddQuiz;
