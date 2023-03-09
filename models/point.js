const mongoose = require("mongoose");
const { Schema } = mongoose;

const pointSchema = new Schema({
  applicationId: { type: String },
  points: { type: Number },
  status: { type: String },
  updatetAt: { type: Date },
  createdAt: { type: Date },
  completedAt: { type: Date },
});

module.exports = mongoose.model("Point", pointSchema);
