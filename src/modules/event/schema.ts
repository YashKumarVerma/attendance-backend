import mongoose from 'mongoose'
import EventValidator from './validator'

const Event = new mongoose.Schema({
  admin: {
    type: String,
    required: 'Username Required',
    unique: true,
    lowercase: true,
    trim: true,
    validate: [EventValidator.username, 'invalid username passed as admin'],
  },
  participants: [
    {
      type: String,
      required: 'Participant Username Required',
      unique: true,
      lowercase: true,
      trim: true,
      validate: [
        EventValidator.username,
        'invalid username passed as participant',
      ],
    },
  ],
  eventName: {
    type: String,
    required: 'Event Name Required',
    trim: true,
    validate: [
      EventValidator.genericText,
      'only alphanumeric characters allowed as event name',
    ],
  },
  eventPicture: {
    type: String,
    default: 'http://via.placeholder.com/150',
    trim: true,
    validate: [
      EventValidator.link,
      'invalid url passed as profile picture link',
    ],
  },
  sessions: [
    {
      type: String,
      trim: true,
      lowercase: true,
    },
  ],
})

export default mongoose.model('Event', Event)
