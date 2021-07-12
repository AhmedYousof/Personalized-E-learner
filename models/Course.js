const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: {
    type: String,
    requied: true,
  },
  field: {
    type: String,
    required: true,
  },
  instructor: {
    id: {
      type: Schema.Types.ObjectId,
      ref: "instructor",
    },
    name: {
      type: String,
    },
    traits: {
      type: Array,
      default: [],
    },
  },
  syllabus: [{}],
  cost: {
    type: Number,
    default: 0,
  },
  learners: [
    {
      learnerId: {
        type: Schema.Types.ObjectId,
        ref: "learner",
      },
      name: {
        type: String,
        required: true,
      },
      course: { type: String },
      courseField: { type: String },
      cost: { type: String },
      instructorName: { type: String },
      instructor: {
        type: Schema.Types.ObjectId,
        ref: "instructor",
      },
    },
  ],
  waitings: [
    {
      learner: {
        type: Schema.Types.ObjectId,
        ref: "learner",
      },
      instructor: { type: String },
      field: { type: String },
      cost: { type: String },
      instructorId: {
        type: Schema.Types.ObjectId,
        ref: "instructor",
      },
      name: { type: String, required: true },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

const Course = mongoose.model("course", courseSchema);
exports.Course = Course;
