const express = require("express");
const router = express.Router();
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { Instructor } = require("../models/Instructor");
const { Learner } = require("../models/Learner");
const { Course } = require("../models/Course");
const bcrypt = require("bcrypt");
const validateLoginInput = require("../validation/login");
const validateTestInput = require("../validation/test");
const passport = require("passport");
const isEmpty = require("../validation/is-empty");

router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  const { email, password } = req.body;
  if (!isValid) {
    return res.status(400).json(errors);
  }
  let learner = await Learner.findOne({ email });
  let instructor = await Instructor.findOne({ email });
  let user;
  if (learner) user = learner;
  if (instructor) user = instructor;
  if (!user) {
    errors.email = "User not found...";
    return res.status(400).send(errors);
  } else {
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      errors.password = "Wrong password";
      return res.status(400).json(errors);
    }
    if (isMatch) {
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      const token = jwt.sign(payload, "secretkey", { expiresIn: 3600 });
      res.json({ token: "Bearer " + token });
    }
  }
});

router.get("/dashboard", async (req, res) => {
  let learner = await Learner.findOne({ _id: req.user._id });
  let instructor = await Instructor.findOne({ _id: req.user._id });
  let user;

  if (learner) user = learner;
  if (instructor) user = instructor;

  res.send(user);
});

router.get("/", async (req, res) => {
  let courses = await Course.find({});
  res.send(courses);
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let role;
    let quizDone;
    let traits = [];
    let learnerCourses = [];
    let newWaitings = [];
    let courses = await Course.find({});
    if (req.user.isInstructor) {
      role = "instructor";
    }
    if (req.user.isLearner) {
      role = "learner";
      if (!isEmpty(req.user.personality.traits)) {
        traits = [
          req.user.personality.traits[0][0],
          req.user.personality.traits[1][0],
        ];
      }
      learnerCourses = req.user.courses;
    }
    newWaitings = courses.map((course) =>
      course.waitings.filter(
        (waiting) => waiting.learner.toString() === req.user.id
      )
    );

    if (req.user.personality.quizDone === false) {
      quizDone = false;
    } else {
      quizDone = true;
    }

    const newCourses = courses.map((course) =>
      course.learners.filter(
        (learner) => learner.learnerId.toString() === req.user.id
      )
    );

    const user = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      role,
      waitings: newWaitings,
      courses: newCourses,
      learnerCourses,
      quizDone,
      traits,
    };
    res.send(user);
  }
);

router.get("/courses", async (req, res) => {
  let courses = await Course.find({});
  res.send(courses);
});

router.post(
  "/assesment/personality-test",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateTestInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    let learner = await Learner.findOne({ _id: req.user._id });
    let instructor = await Instructor.findOne({ _id: req.user._id });
    let user;
    if (learner) user = learner;
    if (instructor) user = instructor;

    let results = req.body.answers;
    //user.personality.answers.push(results);
    user.personality.quizDone = true;

    let a = [];
    if (!isEmpty(results)) {
      results.forEach((answer) => {
        a.push(answer.split(","));
      });
    }

    a.forEach((answer) => {
      if (answer[1] === "E") {
        user.personality.E.score += parseInt(answer[0]);
      }
      if (answer[1] === "A") {
        user.personality.A.score += parseInt(answer[0]);
      }
      if (answer[1] === "O") {
        user.personality.O.score += parseInt(answer[0]);
      }
      if (answer[1] === "C") {
        user.personality.C.score += parseInt(answer[0]);
      }
      if (answer[1] === "N") {
        user.personality.N.score += parseInt(answer[0]);
      }
    });
    user.sortTraits();
    user.CalculatePercentage();

    try {
      user = await user.save();
      res.send(a);
    } catch (ex) {
      for (field in ex.errors) {
        res.status(500).send(ex.errors[field].message);
      }
    }
  }
);

router.get(
  "/results",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let learner = await Learner.findOne({ _id: req.user._id });
    let instructor = await Instructor.findOne({ _id: req.user._id });
    let user;
    if (learner) user = learner;
    if (instructor) user = instructor;
    let a = [];
    let answers = user.personality.answers[0];
    answers.forEach((answer) => {
      a.push(answer.split(","));
    });
    a.forEach((answer) => {
      if (answer[1] === "E") {
        user.personality.E.score += parseInt(answer[0]);
      }
      if (answer[1] === "A") {
        user.personality.A.score += parseInt(answer[0]);
      }
      if (answer[1] === "O") {
        user.personality.O.score += parseInt(answer[0]);
      }
      if (answer[1] === "C") {
        user.personality.C.score += parseInt(answer[0]);
      }
      if (answer[1] === "N") {
        user.personality.N.score += parseInt(answer[0]);
      }
      //res.send(answer[1])
    });
    user = user.save();
    res.json({ answers, a: b, user: user });
  }
);

router.post(
  "/answers",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let instructor = await Instructor.findById(req.user._id);
    let learner = await Learner.findById(req.user._id);
    let user;
    if (instructor) user = instructor;
    if (learner) user = learner;

    const answer = {
      domain: req.body.domain,
      key: req.body.key,
      score: req.body.score,
    };
    user.answers.push(answer);

    user = await user.save();
    res.send(user);
  }
);

router.get(
  "/recommended-courses",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let learner = await Learner.findById(req.user._id);
    if (!learner) return res.status(404).send("User not found!");
    let recommended = [];
    let instructorTraits = [];
    let learnerTraits = [];
    const courses = await Course.find({});
    courses.map(async (course) => {
      const instructor = await Instructor.findOne({
        _id: course.instructor.id,
      });
      instructorTraits = [
        instructor.personality.traits[0][0],
        instructor.personality.traits[1][0],
        instructor.personality.traits[2][0],
      ];
      learnerTraits = [
        learner.personality.traits[0][0],
        learner.personality.traits[1][0],
        learner.personality.traits[2][0],
      ];
      for (let i in instructorTraits) {
        if (learnerTraits.indexOf(instructorTraits[i]) > -1) {
          if (learner.recommended.indexOf(course) === -1) {
            learner.recommended.push(course);
          }
        }
      }
      learner = await learner.save();
    });

    res.send(learner);
  }
);

module.exports = router;
