const mongoose = require("mongoose");
const User = require("./user");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    text: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);
