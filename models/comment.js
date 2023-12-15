const mongoose = require("mongoose");
const User = require("./user");
const Schema = mongoose.Schema;
const Project = require("./Project");

const commentSchema = new Schema(
  {
    text: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: Project
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);
