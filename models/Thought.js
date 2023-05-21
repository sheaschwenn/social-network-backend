// need to add date format
// const mongoose = require("mongoose");
const {Schema, model} = require('mongoose');
const dayjs = require("dayjs");
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function (timestamp) {
      return dayjs(date).format("MM/DD/YYYY");
    },
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema ],
});

const Thought =model("Thought", thoughtSchema);

const handleError = (err) => console.error(err);

module.exports = Thought;
