const express = require("express");
const router = express.Router();
const { Instructor } = require("../models/Instructor");
const { Learner } = require("../models/Learner");
const { Course } = require("../models/Course");
const { Quiz } = require("../models/Quiz");
const validateQuizInput = require("../validation/quiz");
const passport = require("passport");

router.post("/add-quiz", async (req, res) => {
  const { errors, isValid } = validateQuizInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  let quiz = new Quiz();
  quiz.question = req.body.question;
  quiz.domain = req.body.domain;
  quiz.key = req.body.key;
  quiz.answers.answer1 = req.body.answer1;
  quiz.answers.answer2 = req.body.answer2;
  quiz.answers.answer3 = req.body.answer3;
  quiz.answers.answer4 = req.body.answer4;
  quiz.answers.answer5 = req.body.answer5;

  try {
    quiz = await quiz.save();
    res.send(quiz);
  } catch (ex) {
    for (field in ex.errors) {
      res.status(500).send(ex.errors[field].message);
    }
  }
});

router.get(
  "/quiz",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let learner = await Learner.findOne({ _id: req.user._id });
    let instructor = await Instructor.findOne({ _id: req.user._id });
    let user;
    if (learner) user = learner;
    if (instructor) user = instructor;
    if (user.personality.quizDone === false) {
      let quiz = await Quiz.find({});
      res.send(quiz);
    } else {
      res.send("");
    }
  }
);

module.exports = router;
