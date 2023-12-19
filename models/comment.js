const mongoose = require("mongoose");
const User = require("./user");
const Schema = mongoose.Schema;
const Project = require("./Project");

const commentSchema = new Schema(
  {
    text: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    project: {
        type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);
