import mongoose from 'mongoose'
import EventValidator from './validator'
import { SessionSchema } from '../session/schema'
import { UserSchema } from '../user/schema'

const Event = new mongoose.Schema({
  admin: UserSchema,
  participants: [UserSchema],
  sessions: [SessionSchema],

  name: {
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
    required: 'Event Slug Required',
    trim: true,
    unique: true,
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
