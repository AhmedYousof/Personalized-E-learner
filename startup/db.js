const mongoose = require("mongoose");

module.exports = function () {
  const db = "mongodb://localhost:27017/PElearning";
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Connected to ${db}....`));
};
