const mongoose = require("mongoose");
require("dotenv").config();

const connectionURL = process.env.CONNECTION_URL;

/* istanbul ignore next */
function connect() {
  console.log("db connecting...");
  return mongoose.connect(connectionURL, {
    // useUnifiedTopology: true,
    // useNewUrlParser: true,
    config: {
      autoIndex: true,
    },
  });
}

const db = {
  connect: connect
};

module.exports = db;
