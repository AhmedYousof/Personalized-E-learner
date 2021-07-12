const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const instructorSchema = new Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: { type: String, required: true, minlength: 6, maxlength: 1024 },
  confirmpassword: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  avatar: String,
  city: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  bio: {
    type: String,
  },
  website: {
    type: String,
  },
  social: {
    youtube: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      default: "",
    },
    facebook: {
      type: String,
      default: "",
    },
    linkedin: {
      type: String,
      default: "",
    },
  },
  personality: {
    quizDone: {
      type: Boolean,
      default: false,
    },
    N: {
      score: {
        type: Number,
        default: 0,
      },
      percentage: String,
    },
    E: {
      score: {
        type: Number,
        default: 0,
      },
      percentage: String,
    },
    O: {
      score: {
        type: Number,
        default: 0,
      },
      percentage: String,
    },
    A: {
      score: {
        type: Number,
        default: 0,
      },
      percentage: {
        type: Number,
      },
    },
    C: {
      score: {
        type: Number,
        default: 0,
      },
      percentage: {
        type: Number,
      },
    },
    answers: [{}],
    traits: {
      type: Array,
    },
  },
  courses: [
    {
      studentId: { type: Schema.Types.ObjectId, ref: "learner" },
      name: { type: String, required: true },
      course: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  ],

  waitings: [
    {
      learner: {
        type: Schema.Types.ObjectId,
        ref: "learner",
      },
      name: { type: String, required: true },
      course: {
        type: Schema.Types.ObjectId,
        ref: "course",
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],

  isInstructor: {
    type: Boolean,
    default: true,
  },
});

instructorSchema.methods.CalculatePercentage = function () {
  const aPercentage = (this.personality.A.score / 50) * 100;
  this.personality.A.percentage = aPercentage;

  const nPercentage = (this.personality.N.score / 50) * 100;
  this.personality.N.percentage = nPercentage;

  const ePercentage = (this.personality.E.score / 50) * 100;
  this.personality.E.percentage = ePercentage;

  const oPercentage = (this.personality.O.score / 50) * 100;
  this.personality.O.percentage = oPercentage;

  const cPercentage = (this.personality.C.score / 50) * 100;
  this.personality.C.percentage = cPercentage;
};

instructorSchema.methods.sortTraits = function () {
  const scores = {
    A: parseInt(this.personality.A.percentage),
    E: parseInt(this.personality.E.percentage),
    N: parseInt(this.personality.N.percentage),
    O: parseInt(this.personality.O.percentage),
    C: parseInt(this.personality.C.percentage),
  };
  let sortable = [];
  for (var score in scores) {
    sortable.push([score, scores[score]]);
  }
  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });
  this.personality.traits = sortable;
};

const Instructor = mongoose.model("instructor", instructorSchema);
exports.Instructor = Instructor;
