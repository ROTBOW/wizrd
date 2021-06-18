const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    hostId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    hostUsername: {
      type: String,
      required: true
    },
    hostAvatar: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    topic: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    startTime: {
      type: Date,
      required: true,
    },
    isOver: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = Event = mongoose.model('Event', EventSchema);
