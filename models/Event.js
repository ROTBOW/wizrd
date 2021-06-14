const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    hostId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    streamId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    startTime: {
      type: Date
    },
    endTime: {
      type: Date
    },
  },
  {
    timestamps: true
  }
);

module.exports = Tweet = mongoose.model('Event', EventSchema);
