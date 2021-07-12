import React, { Component } from "react";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobileAlt,
  faMapMarkerAlt,
  faEnvelope,
  faMapMarked,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import axios from "axios";

class Profile extends Component {
  state = {
    user: {},
  };
  componentDidMount() {
    axios.get("/api/users/profile").then((res) => {
      const user = res.data;
      this.setState({ user });
    });
  }

  render() {
    const profile = this.state.user;

    let ProfileContent;
    if (!profile) {
      ProfileContent = (
        <div>
          <h1>The page not found! Error 404</h1>
        </div>
      );
    } else {
      ProfileContent = (
        <div>
          <div className="row">
            <div className="col-md-6 pt-2">
              <Link
                to="/users/edit-profile"
                className="btn btn-info mb-3 float-left"
              >
                Edit Profile
              </Link>
            </div>
            <div className="col-md-6"></div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-info text-white mb-3">
                <div className="row">
                  <div className="col-md-3 m-auto">
                    <img
                      className="rounded-circle"
                      src={profile.avatar}
                      alt=""
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h2 className="text-center">{profile.name}</h2>
                  <p>
                    <FontAwesomeIcon icon={faMapMarked} size="lg" />
                    <t></t> {profile.city}, {profile.address}
                  </p>
                </div>
                {isEmpty(
                  profile.personality && profile.personality.quizDone
                ) ? null : (
                  <div>
                    {profile.personality.quizDone === false ? (
                      <Link
                        to="/assessment/personality-test"
                        className="btn btn-info  active"
                        style={{ fontWeight: "500" }}
                      >
                        Perform personality test now
                      </Link>
                    ) : (
                      <Link
                        to="/assessment/results"
                        className="btn btn-info active"
                        style={{ fontWeight: "500" }}
                      >
                        {" "}
                        See your personality traits (personality test results)
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-light mb-3">
                <hr />
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  <div className="p-3">
                    <FontAwesomeIcon icon={faMobileAlt} size="lg" />{" "}
                    {profile.phone}
                  </div>
                  <div className="p-3">
                    <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />{" "}
                    {profile.city}
                  </div>
                  <div className="p-3">
                    <FontAwesomeIcon icon={faEnvelope} size="lg" />{" "}
                    {profile.email}
                  </div>
                </div>
                <hr />

                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  <p className=" p-3">
                    {isEmpty(profile.website) ? null : (
                      <Link
                        className="text-dark p-3 "
                        to={profile.website}
                        target="_balnk"
                      >
                        <FontAwesomeIcon icon={faGlobe} size="2x" />
                      </Link>
                    )}
                    {isEmpty(
                      profile.social && profile.social.twitter
                    ) ? null : (
                      <Link
                        className=" text-dark p-3 "
                        to={profile.social.twitter}
                        target="_balnk"
                      >
                        <FontAwesomeIcon icon={faTwitter} size="2x" />
                      </Link>
                    )}

                    {isEmpty(
                      profile.social && profile.social.facebook
                    ) ? null : (
                      <Link
                        className=" text-dark p-3 "
                        to={profile.social.facebook}
                        target="_balnk"
                      >
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                      </Link>
                    )}
                    {isEmpty(
                      profile.social && profile.social.linkedin
                    ) ? null : (
                      <Link
                        className=" text-dark p-3 "
                        to={profile.social.linkedin}
                        target="_balnk"
                      >
                        <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
                      </Link>
                    )}
                    {isEmpty(
                      profile.social && profile.social.youtube
                    ) ? null : (
                      <Link
                        className=" text-dark p-3 "
                        href={profile.social.youtube}
                        target="_balnk"
                      >
                        <FontAwesomeIcon icon={faYoutube} size="2x" />
                      </Link>
                    )}
                  </p>
                </div>
                <hr />
                <h3 className="text-center text-info">{profile.name}'s Bio</h3>
                <p className="lead">
                  {isEmpty(profile.bio) ? (
                    <span>{profile.name} dosen't have a bio!</span>
                  ) : (
                    <span>{profile.bio}</span>
                  )}
                </p>
                <hr />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{ProfileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
