import mongoose, { mongo } from 'mongoose'
import EventValidator from './validator'

const Event = new mongoose.Schema({
  admin: {
    type: String,
    trim: true,
    required: true,
  },

  participants: [
    {
      type: String,
      trim: true,
    },
  ],

  sessions: [
    {
      type: String,
      trim: true,
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

  slug: {
    type: String,
    required: 'property slug required',
    trim: true,
    unique: true,
    validate: [
      EventValidator.slug,
      'event slug should be atleast 6 characters long',
    ],
  },

  picture: {
    type: String,
    default: 'http://via.placeholder.com/150',
    trim: true,
    validate: [
      EventValidator.link,
      'invalid url passed as profile picture link',
    ],
  },

  description: {
    type: String,
    required: false,
  },
})

const EventModel = mongoose.model('Event', Event)
export { Event as EventSchema, EventModel }
