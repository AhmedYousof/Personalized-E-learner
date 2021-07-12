const express = require("express");
const users = require("../routes/users");
const index = require("../routes/index");
const learner = require("../routes/learner");
const instructor = require("../routes/instructor");
const admin = require("../routes/admin");
const path = require("path");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "public")));
  app.use(passport.initialize());
  app.use(cookieParser());
  app.use(morgan("dev"));
  app.use("/api/users", users);
  app.use("/api", index);
  app.use("/api/learner", learner);
  app.use("/api/instructor", instructor);
  app.use("/api/admin", admin);
};
