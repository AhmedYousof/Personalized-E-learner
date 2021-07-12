import React, { Component } from "react";
import axios from "axios";
import isEmpty from "../../validation/is-empty";
import { Bar } from "react-chartjs-2";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    axios.get("/api/users/profile").then((res) => {
      const user = res.data;

      this.setState({
        user: user,
        isAuthenticated: !isEmpty(user),
      });
    });
  }

  render() {
    const { user } = this.state;
    let data = [];
    let options = [];
    if (!isEmpty(user.personality && user.personality.traits)) {
      const traits = user.personality.traits;
      let xValues = [
        traits[0][0],
        traits[1][0],
        traits[2][0],
        traits[3][0],
        traits[4][0],
      ];
      let yValues = [
        traits[0][1],
        traits[1][1],
        traits[2][1],
        traits[3][1],
        traits[4][1],
      ];
      data = {
        labels: xValues,
        datasets: [
          {
            label: "% trait percentage",
            data: yValues,
            backgroundColor: [
              "rgba(255, 99, 132, 0.3)",
              "rgba(54, 162, 235, 0.3)",
              "rgba(255, 206, 86, 0.3)",
              "rgba(75, 192, 192, 0.3)",
              "rgba(153, 102, 255, 0.3)",
              "rgba(255, 159, 64, 0.3)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
      options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="col-md-12 text-center">
            <h1>Personality test results...</h1>
            <Bar data={data} options={options} />
            <div className="mt-2">
              <p className="text-left m-3">
                <h5 className="text-info">
                  E = Extraversion{" "}
                  <h6 className="pt-3 text-dark trait-desc">
                    <i>
                      Engaging with people (Extraversion) concerns someone’s
                      interest, investment and comfort in developing
                      relationships with others - customers, clients, work
                      groups or colleagues.
                    </i>
                  </h6>{" "}
                </h5>
              </p>
              <p className="text-left m-3">
                <h5 className="text-info">
                  A = Agreeableness{" "}
                  <h6 className="pt-2 text-dark trait-desc">
                    <i>
                      Influencing people (Agreeableness) concerns the way
                      someone balances their emotional understanding of other
                      people, and their respect for differing viewpoints, with
                      the style in which they try to influence or negotiate with
                      them.
                    </i>
                  </h6>{" "}
                </h5>
              </p>
              <p className="text-left m-3">
                <h5 className="text-info">
                  O = Emotional Stability
                  <h6 className="pt-2 text-dark trait-desc">
                    <i>
                      Managing pressure (Emotional Stability) concerns the
                      manner in which someone deals with pressure and the way in
                      which they control their emotions and underlying tension,
                      in order to stay on task and cope with everyday
                      challenges.
                    </i>
                  </h6>{" "}
                </h5>
              </p>
              <p className="text-left m-3">
                <h5 className="text-info">
                  N = Intellect/Imagination{" "}
                  <h6 className="pt-2 text-dark trait-desc">
                    <i>
                      Solving Problems (Openness) concerns how someone thinks
                      about work problems, projects and challenges, how
                      receptive they are to new or different information or
                      approaches, and the way this influences their
                      decision-making.
                    </i>
                  </h6>{" "}
                </h5>
              </p>
              <p className="text-left m-3">
                <h5 className="text-info">
                  C = Conscientiousness{" "}
                  <h6 className="pt-2 text-dark trait-desc">
                    <i>
                      Delivering Results (Conscientiousness) concerns work style
                      and how someone directs their efforts and attention toward
                      completing tasks. The level of discipline, dedication,
                      perseverance, organization and reliability are hallmark
                      factors of this dimension.
                    </i>
                  </h6>{" "}
                </h5>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Results;
