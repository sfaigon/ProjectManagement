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

projectSchema.path("dateCreated").get(function (value) {
  const formattedDate = new Date(value).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  return formattedDate;
});

module.exports = mongoose.model("Project", projectSchema);
