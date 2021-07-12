const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const { Instructor } = require("../models/Instructor");
const { Learner } = require("../models/Learner");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secretkey";

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      const instructor = await Instructor.findById(jwt_payload.id);
      const learner = await Learner.findById(jwt_payload.id);
      let user;
      if (instructor) user = instructor;
      if (learner) user = learner;

      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
  );
};
