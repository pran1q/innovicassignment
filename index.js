require("dotenv").config();
const PORT = process.env.PORT || 8080;

const express = require("express");
const mongoose = require("mongoose");
const database = require("./util/database");

const application = require("./routes/application");
const page404 = require("./routes/page404");

const app = express();

app.use(express.json());
app.use(application);
app.use(page404);

mongoose.connection.once("open", function () {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
  });
});
