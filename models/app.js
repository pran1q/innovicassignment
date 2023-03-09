const mongoose = require("mongoose");
const { Schema } = mongoose;

const appSchema = new Schema({
  type: { type: String },
  name: { type: String },
  createdAt: { type: Date },
  deleted: { type: Boolean },
  enabled: { type: Boolean },
  price: { type: Number },
  meta: {
    package: { type: String },
    platform: { type: String },
  },
});

module.exports = mongoose.model("App", appSchema);
