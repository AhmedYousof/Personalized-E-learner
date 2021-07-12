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
const validateCourseInput = require("../validation/course");

router.post("/register", async (req, res) => {
  const { errors, isValid } = validateUserInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  let instructor = await Instructor.findOne({ email: req.body.email });
  let learner = await Learner.findOne({ email: req.body.email });

  if (instructor || learner) {
    errors.email = "Email already exists";
    return res.status(400).json(errors);
  } else {
    const avatar = gravatar.url(req.body.email, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    instructor = new Instructor(
      _.pick(req.body, ["name", "email", "password", "confirmpassword"])
    );
    instructor.avatar = avatar;
    const salt = await bcrypt.genSalt(10);
    instructor.password = await bcrypt.hash(instructor.password, salt);
    const isMatch = bcrypt.compare(
      instructor.confirmpassword,
      instructor.password
    );

    try {
      if (isMatch) {
        instructor = await instructor.save();
        res.send(_.pick(instructor, ["_id", "name", "email"]));
      }
    } catch (ex) {
      for (field in ex.errors) {
        res.status(500).send(ex.errors[field].message);
      }
    }
  }
});

router.post(
  "/add-course",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateCourseInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    let instructor = await Instructor.findOne({ _id: req.user._id });

    if (!instructor) {
      return res.status(401).send("You don't have permission to add courses");
    } else {
      let course = new Course();

      const traits = [req.user.personality.traits[0][0]];

      course.name = req.body.name;
      course.field = req.body.field;
      course.cost = req.body.cost;
      course.instructor.id = req.user._id;
      course.instructor.name = req.user.name;
      course.instructor.traits = traits;
      course.syllabus.push(req.body.syllabus);

      try {
        course = await course.save();
        res.send(course);
      } catch (ex) {
        for (field in ex.errors) {
          res.status(500).send(ex.errors[field].message);
        }
      }
    }
  }
);

router.post(
  "/aprove-learner/:course_id/:learnerId/:waitingId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let instructor = await Instructor.findOne({ _id: req.user.id });
    let learner = await Learner.findById(req.params.learnerId);
    let course = await Course.findOne({ _id: req.params.course_id });
    let courseSyllabus = [];
    if (course.instructor.id.toString() !== req.user.id) {
      return res.send(
        "You are not allowed to control this request... 401 unAuth"
      );
    } else {
      const newLearner = {
        learnerId: learner._id,
        name: learner.name,
        instructor: course.instructor.id,
        instructorName: course.instructor.name,
        course: course.name,
        courseField: course.field,
        date: new Date()
          .toISOString()
          .replace(/T/, " ") // replace T with a space
          .replace(/\..+/, ""),
      };

      const syllabusWays = [
        {
          way: course.syllabus[0].learningWay1,
          name: course.syllabus[0].name1,
        },
        {
          way: course.syllabus[0].learningWay2,
          name: course.syllabus[0].name2,
        },
        {
          way: course.syllabus[0].learningWay3,
          name: course.syllabus[0].name3,
        },
        {
          way: course.syllabus[0].learningWay4,
          name: course.syllabus[0].name4,
        },
        {
          way: course.syllabus[0].learningWay5,
          name: course.syllabus[0].name5,
        },
        {
          way: course.syllabus[0].learningWay6,
          name: course.syllabus[0].name6,
        },

        {
          way: course.syllabus[0].learningWay7,
          name: course.syllabus[0].name7,
        },
      ];

      const higherTraits = [
        learner.personality.traits[0][0],
        learner.personality.traits[1][0],
        learner.personality.traits[2][0],
      ];

      syllabusWays.map((syllabus) => {
        if (higherTraits.includes(syllabus.way)) {
          courseSyllabus.push(syllabus);
        }
      });

      const newCourse = {
        courseId: course._id,
        instructor: course.instructor.id,
        instructorName: course.instructor.name,
        course: course.name,
        cost: course.cost,
        courseField: course.field,
        date: new Date()
          .toISOString()
          .replace(/T/, " ") // replace T with a space
          .replace(/\..+/, ""),
        syllabus: courseSyllabus,
      };

      let learnerCourse = learner.courses.unshift(newCourse);

      const removeWaitingIndex = course.waitings
        .map((item) => item._id)
        .indexOf(req.params.waitingId);
      course.waitings.splice(removeWaitingIndex, 1);
      //teacher
      let courseLearner = course.learners.unshift(newLearner);
      const removeIndex = learner.waitings
        .map((item) => item.course)
        .indexOf(req.params.course_id);
      learner.waitings.splice(removeIndex, 1);
      learnerCourse = await learner.save();

      courseLearner = await course.save();

      let courses = await Course.find({});
      res.send(courses);
    }
  }
);

router.post(
  "/refuse-learner/:course_id/:learnerId/:waitingId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let instructor = await Instructor.findOne({ _id: req.user.id });
    let learner = await Learner.findById(req.params.learnerId);
    let course = await Course.findOne({ _id: req.params.course_id });

    if (course.instructor.id.toString() !== req.user.id) {
      return res.send(
        "You are not allowed to control this request... 401 unAuth"
      );
    } else {
      const removeWaitingIndex = course.waitings
        .map((item) => item._id)
        .indexOf(req.params.waitingId);
      course.waitings.splice(removeWaitingIndex, 1);
      const removeIndex = learner.waitings
        .map((item) => item.course)
        .indexOf(req.params.course_id);
      learner.waitings.splice(removeIndex, 1);
      course = await course.save();
      learner = await learner.save();

      let courses = await Course.find({});
      res.send(courses);
    }
  }
);

router.post(
  "/remove-learner/:course_id/:learnerId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let instructor = await Instructor.findOne({ _id: req.user.id });
    let learner = await Learner.findById(req.params.learnerId);
    let course = await Course.findOne({ _id: req.params.course_id });

    if (course.instructor.id.toString() !== req.user.id) {
      return res.send(
        "You are not allowed to control this request... 401 unAuth"
      );
    } else {
      const removeWaitingIndex = course.learners
        .map((item) => item.learnerId)
        .indexOf(req.params.learnerId);
      course.learners.splice(removeWaitingIndex, 1);
      const removeIndex = learner.courses
        .map((item) => item.courseId)
        .indexOf(req.params.course_id);
      learner.courses.splice(removeIndex, 1);
      course = await course.save();
      learner = await learner.save();

      let courses = await Course.find({});
      res.send(courses);
    }
  }
);

module.exports = router;
