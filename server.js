const passport = require("passport");
const express = require("express");
const app = express();

require("./config/passport")(passport);
require("./startup/routes")(app);
require("./startup/db")();


const port = 5000 || process.env.PORT;
const server = app.listen(
  port,
  console.log(`Server is running on port ${port}...`)
);

module.export = server;
