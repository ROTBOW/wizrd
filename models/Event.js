const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    hostId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    // streamId: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
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
      type: Date,
      required: true,
    },
    // endTime: {
    //   type: Date
    // },
    isOver: {
      type: Boolean
    }
  },
  {
    timestamps: true
  }
);

module.exports = Event = mongoose.model('Event', EventSchema);
