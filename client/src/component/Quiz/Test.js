import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";
import isEmpty from "../../validation/is-empty";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz: [],
      key: "",
      domain: "",
      answer: "",
      answers: [],
      errors: {},
      active: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get("/api/admin/quiz").then((res) => {
      const quiz = res.data;
      this.setState({ quiz });
    });
  }

  onChange(e, i) {
    const { answers, quiz } = this.state;
    const len = quiz.length;
    this.setState({ answer: e.target.value });

    this.state.answers[i] = e.target.value;

    this.setState({ answers: this.state.answers });
    this.setState({ answer: e.target.value });
    for (let i = 0; i < len; i++) {
      if (answers.includes(undefined) || answers.length !== len) {
        this.setState({ active: false });
      } else {
        this.setState({ active: true });
      }
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const quizData = {
      answers: this.state.answers,
    };

    axios
      .post("/api/assesment/personality-test", quizData)
      .then((res) => {
        const quiz = res.data;
        window.location.replace("/assessment/results");
      })
      .catch((err) => {
        if (err.response) this.setState({ errors: err.response.data });
      });
  }

  render() {
    const { quiz, errors, answers } = this.state;
    let content;
    if (quiz === "") {
      content = (
        <div>
          <h3 className="text-warning">
            {" "}
            Already Performed Personality test...{" "}
          </h3>
        </div>
      );
    } else {
      content = (
        <form className="form-group " onSubmit={this.onSubmit}>
          <h1 className="text-info">Perform personality test</h1>
          {quiz.map((q, i) => (
            <div className="text-left p-3">
              <h5>
                {i + 1}.{q.question}
              </h5>
              <select
                name="answers"
                value={this.state.answers[i]}
                className={classnames("custom-select custom-select-lg", {
                  "is-invalid": errors.answers,
                })}
                onChange={(e) => this.onChange(e, i)}
              >
                <option className="form-control" value="">
                  Choose the answer
                </option>
                <option
                  className="form-control"
                  value={[q.answers.answer1, q.domain]}
                >
                  Very Inaccurate{" "}
                </option>
                <option
                  className="form-control"
                  value={[q.answers.answer2, q.domain]}
                >
                  Moderately Inaccurate{" "}
                </option>
                <option
                  className="form-control"
                  value={[q.answers.answer3, q.domain]}
                >
                  Neither Inaccurate nor Accurate{" "}
                </option>
                <option
                  className="form-control"
                  value={[q.answers.answer4, q.domain]}
                >
                  Moderately Accurate{" "}
                </option>
                <option
                  className="form-control"
                  value={[q.answers.answer5, q.domain]}
                >
                  Very Accurate{" "}
                </option>
              </select>
            </div>
          ))}

          <button
            type="submit"
            className="btn btn-info btn-block mt-4"
            disabled={this.state.active === false ? "disabled" : ""}
          >
            Sumbit
          </button>
        </form>
      );
    }

    return <div>{content}</div>;
  }
}

export default Test;
