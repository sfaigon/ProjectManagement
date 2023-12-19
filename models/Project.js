const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 6;

const projectSchema = new Schema({
  name: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  teamMembers: [],
  tasks: [],
  comments: {},
});

module.exports = mongoose.model("Project", projectSchema);
