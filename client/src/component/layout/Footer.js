import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div>
        <footer
          className="text-secondary mt-5 p-4 text-center"
          style={{ backgroundColor: "#FFF1CC" }}
        >
          Copyright &copy; {new Date().getFullYear()} P-Elearning
        </footer>
      </div>
    );
  }
}
export default Footer;
