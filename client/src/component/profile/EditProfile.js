import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";
import isEmpty from "../../validation/is-empty";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      user: {},
      email: "",
      name: "",
      city: "",
      address: "",
      phone: "",
      website: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    const profile = nextProps.user;

    this.setState({
      name: profile.name,
      email: profile.email,
    });
  }

  componentDidMount() {
    axios.get("/api/users/profile").then((res) => {
      const profile = res.data;
      if (!isEmpty(profile.social)) {
        this.setState({
          name: profile.name,
          email: profile.email,
          city: profile.city,
          address: profile.address,
          phone: profile.phone,
          website: profile.website,
          bio: profile.bio,
          twitter: profile.social.twitter,
          facebook: profile.social.facebook,
          linkedin: profile.social.linkedin,
          youtube: profile.social.youtube,
        });
      } else {
        this.setState({
          name: profile.name,
          email: profile.email,
          city: profile.city,
          address: profile.address,
          phone: profile.phone,
          website: profile.website,
          bio: profile.bio,
        });
      }
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      name: this.state.name,
      email: this.state.email,
      course: this.state.course,
      city: this.state.city,
      address: this.state.address,
      phone: this.state.phone,
      sallary: this.state.sallary,
      website: this.state.website,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      errors: {},
    };
    axios
      .post("/api/users/edit-profile", profileData)
      .then((res) => window.location.assign("/users/profile"))
      .catch((err) => {
        this.setState({ errors: err.response.data });
      });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <div className="input-group p-1">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-facebook-square" />
              </span>
              <input
                type="text"
                onChange={this.onChange}
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.facebook,
                })}
                placeholder="Enter your Facebook...."
                name="facebook"
                value={this.state.facebook}
              />
              {errors.facebook && (
                <div className="invalid-feedback">{errors.facebook}</div>
              )}
            </div>
          </div>
          <div className="input-group p-1">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-twitter-square" />
              </span>
              <input
                type="text"
                onChange={this.onChange}
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.twitter,
                })}
                placeholder="Enter your twitter...."
                name="twitter"
                value={this.state.twitter}
              />
              {errors.twitter && (
                <div className="invalid-feedback">{errors.twitter}</div>
              )}
            </div>
          </div>
          <div className="input-group p-1">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-linkedin-square" />
              </span>
              <input
                type="text"
                onChange={this.onChange}
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.linkedin,
                })}
                placeholder="Enter your LinkedIn...."
                name="linkedin"
                value={this.state.linkedin}
              />
              {errors.linkedin && (
                <div className="invalid-feedback">{errors.linkedin}</div>
              )}
            </div>
          </div>
          <div className="input-group p-1">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-youtube-play" />
              </span>
              <input
                type="text"
                onChange={this.onChange}
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.youtube,
                })}
                placeholder="Enter your Youtube...."
                name="youtube"
                value={this.state.youtube}
              />
              {errors.youtube && (
                <div className="invalid-feedback">{errors.youtube}</div>
              )}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="p-3">
        <h2 className="m-5">Edit your profile</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group p-1">
            <input
              type="text"
              onChange={this.onChange}
              className={classnames("form-control", {
                "is-invalid": errors.name,
              })}
              placeholder="Enter your name...."
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
                "is-invalid": errors.city,
              })}
              placeholder="Enter your city...."
              name="city"
              value={this.state.city}
            />
            {errors.city && (
              <div className="invalid-feedback">{errors.city}</div>
            )}
          </div>

          <div className="form-group p-1">
            <input
              type="text"
              onChange={this.onChange}
              className={classnames("form-control", {
                "is-invalid": errors.address,
              })}
              placeholder="Enter your Address...."
              name="address"
              value={this.state.address}
            />
            {errors.address && (
              <div className="invalid-feedback">{errors.address}</div>
            )}
          </div>

          <div className="form-group p-1">
            <input
              type="text"
              onChange={this.onChange}
              className={classnames("form-control", {
                "is-invalid": errors.phone,
              })}
              placeholder="Enter your phone...."
              name="phone"
              value={this.state.phone}
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
          </div>
          <div className="form-group p-1">
            <input
              type="text"
              onChange={this.onChange}
              className={classnames("form-control", {
                "is-invalid": errors.website,
              })}
              placeholder="Enter your website...."
              name="website"
              value={this.state.website}
            />
            {errors.website && (
              <div className="invalid-feedback">{errors.website}</div>
            )}
          </div>
          <div className="form-group p-1">
            <input
              type="text"
              onChange={this.onChange}
              className={classnames("form-control", {
                "is-invalid": errors.bio,
              })}
              placeholder="Enter your Bio...."
              name="bio"
              value={this.state.bio}
            />
            {errors.bio && <div className="invalid-feedback">{errors.bio}</div>}
          </div>
          <div className="mb-3">
            <button
              type="button"
              onClick={() => {
                this.setState((prevState) => ({
                  displaySocialInputs: !prevState.displaySocialInputs,
                }));
              }}
              className="btn btn-light"
            >
              Add Social Netowork Links
            </button>
            <span className="text-muted"> Optional </span>
          </div>
          {socialInputs}
          <input
            type="submit"
            className="btn btn-info btn-block mt-4"
            value="Submit"
          />
        </form>
      </div>
    );
  }
}

export default EditProfile;
