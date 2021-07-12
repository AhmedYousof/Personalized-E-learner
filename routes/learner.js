const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Instructor } = require("../models/Instructor");
const { Learner } = require("../models/Learner");
const { Course } = require("../models/Course");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const passport = require("passport");
const validateUserInput = require("../validation/users");

router.post("/register", async (req, res) => {
  const { errors, isValid } = validateUserInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  let learner = await Learner.findOne({ email: req.body.email });
  let instructor = await Instructor.findOne({ email: req.body.email });

  if (learner || instructor) {
    errors.email = "Email already exists";
    return res.status(400).json(errors);
  } else {
    const avatar = gravatar.url(req.body.email, {
      s: "200",
      r: "pg",
      d: "mm",
    });
    learner = new Learner(
      _.pick(req.body, ["name", "email", "password", "confirmpassword"])
    );
    learner.avatar = avatar;
    const salt = await bcrypt.genSalt(10);
    learner.password = await bcrypt.hash(learner.password, salt);
    const isMatch = bcrypt.compare(learner.confirmpassword, learner.password);

    try {
      if (isMatch) {
        learner = await learner.save();

        res.status(200).send(_.pick(learner, ["_id", "name", "email"]));
      }
    } catch (ex) {
      for (field in ex.errors) {
        res.status(500).send(ex.errors[field].message);
      }
    }
  }
});

router.post(
  "/join-request/:course_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let learner = await Learner.findOne({ _id: req.user.id });
    let course = await Course.findOne({ _id: req.params.course_id });
    if (!learner) {
      res.send("UnAuth request...");
    }
    if (
      course.waitings.filter(
        (waiting) => waiting.learner.toString() === req.user.id
      ).length > 0 ||
      course.learners.filter(
        (learner) => learner.learnerId.toString() === req.user.id
      ).length > 0
    ) {
      return res.status(400).json("Enrolled");
    } else {
      //student
      const newLearner = {
        learner: learner._id,
        name: learner.name,
        instructor: course.instructor.name,
        instructorId: course.instructor.id,
        field: course.field,
        cost: course.cost,
        date: new Date()
          .toISOString()
          .replace(/T/, " ") // replace T with a space
          .replace(/\..+/, ""),
      };
      const newCourse = {
        instructor: course.instructor.id,
        name: course.instructor.name,
        course: course._id,
        courseName: course.name,
        courseField: course.field,
        cost: course.cost,
        date: new Date()
          .toISOString()
          .replace(/T/, " ") // replace T with a space
          .replace(/\..+/, ""),
      };

      let waiting = learner.waitings.unshift(newCourse);
      //teacher
      let coursewaiting = course.waitings.unshift(newLearner);
      coursewaiting = await course.save();
      waiting = await learner.save();

      res.send("Done");
    }
  }
);

router.get(
  "/course-info/:courseId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let learner = await Learner.findOne({ _id: req.user.id });
    const course = learner.courses.filter(
      (course) => course.courseId.toString() === req.params.courseId
    );

    res.send(course);
  }
);

module.exports = router;
