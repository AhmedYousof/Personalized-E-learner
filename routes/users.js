const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Instructor } = require("../models/Instructor");
const { Learner } = require("../models/Learner");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const validateUserInput = require("../validation/users");
const validateProfileInput = require("../validation/profile");
const passport = require("passport");

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let learner = await Learner.findById(req.user._id);
    let instructor = await Instructor.findById(req.user._id);

    let user;
    if (learner) user = learner;
    if (instructor) user = instructor;

    if (!user) return res.status(404).send("User not found!");
    user.sortTraits();
    user = await user.save();
    res.send(user);
  }
);

router.post(
  "/edit-profile",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let learner = await Learner.findOne({ _id: req.user._id });
    let instructor = await Instructor.findOne({ _id: req.user._id });
    let user;
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    if (learner) user = learner;
    if (instructor) user = instructor;

    if (req.body.name) user.name = req.body.name;
    if (req.body.address) user.address = req.body.address;
    if (req.body.phone) user.phone = req.body.phone;
    if (req.body.city) user.city = req.body.city;
    if (req.body.bio) user.bio = req.body.bio;
    if (req.body.website) user.website = req.body.website;
    if (req.body.youtube) user.social.youtube = req.body.youtube;
    if (req.body.twitter) user.social.twitter = req.body.twitter;
    if (req.body.facebook) user.social.facebook = req.body.facebook;
    if (req.body.linkedin) user.social.linkedin = req.body.linkedin;

    try {
      user = await user.save();
      res.send(user);
    } catch (ex) {
      for (field in ex.errors) {
        res.status(500).send(ex.errors[field].message);
      }
    }
  }
);

module.exports = router;
