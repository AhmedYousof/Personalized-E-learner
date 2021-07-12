import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { Component } from "react";
import Navbar from "./component/layout/Navbar";
import Footer from "./component/layout/Footer";
import Login from "./component/auth/Login";
import InstructorRegister from "./component/auth/InstructorRegister";
import setAuthToken from "./utils/setAuthToken";
import EditProfile from "./component/profile/EditProfile";
import LearnerRegister from "./component/auth/LearnerRegister";
import Profile from "./component/profile/Profile";
import AddQuiz from "./component/Quiz/AddQuiz";
import Test from "./component/Quiz/Test";
import addCourse from "./component/course/Add-course";
import Dashboard from "./component/dashboard/Dashboard";
import LearnerCourses from "./component/dashboard/LearnerCourses";
import Results from "./component/Quiz/Results";
import CourseInfo from "./component/dashboard/CourseInfo";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Dashboard} />

          <div className="container">
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={InstructorRegister} />
            <Route exact path="/learner/register" component={LearnerRegister} />
            <Route exact path="/users/edit-profile" component={EditProfile} />
            <Route exact path="/users/profile" component={Profile} />
            <Route exact path="/admin/add-quiz" component={AddQuiz} />
            <Route exact path="/instructor/add-course" component={addCourse} />
            <Route exact path="/assessment/personality-test" component={Test} />
            <Route exact path="/learner/myCourses" component={LearnerCourses} />
            <Route exact path="/assessment/results" component={Results} />
            <Route
              exact
              path="/learner/course-info/:courseId"
              component={CourseInfo}
            />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
