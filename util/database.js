require("dotenv").config();

const mongoose = require("mongoose");
const uri = process.env.MONGO_CONNECTION_STRING;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((error) => {
    console.error("Connection error:", error);
  });

module.exports = mongoose;
