const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateToDo: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    default: "00:00",
  },
  status: {
    type: Boolean,
    default: false,
  },
  recurrence: {
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      default: 'daily',
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    
  },
  collaborators: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  tasks: [taskSchema],
});

const User = mongoose.model("User", userSchema, "users");

module.exports = {
  User,
};
