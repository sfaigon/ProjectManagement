const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    dateAssigned: {
      type: Date,
      required: true,
      default: Date.now,
    },
    description: {
      type: String,
      required: true,
    },
    stage: {
      type: String,
      enum: ['To Do', 'In Progress', 'Done'], 
      default: 'To Do',
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    project: [
      {
      type: mongoose.Schema.Types.ObjectId,
      },
    ]
  }, {
    timestamps: true
  });
  
  module.exports = mongoose.model('Task', taskSchema);
  
  