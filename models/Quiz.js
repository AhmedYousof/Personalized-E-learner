const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const quizSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
    enum: ["N", "E", "O", "A", "C"],
  },
  key: {
    type: String,
    enum: ["-", "+"],
    required: true,
  },
  answers: {
    answer1: {
      type: Number,
      default: "",
    },
    answer2: {
      type: Number,
      default: 0,
    },
    answer3: {
      type: Number,
      default: 0,
    },
    answer4: {
      type: Number,
      default: 0,
    },
    answer5: {
      type: Number,
      default: 0,
    },
  },
});

const Quiz = mongoose.model("quiz", quizSchema);

exports.Quiz = Quiz;
