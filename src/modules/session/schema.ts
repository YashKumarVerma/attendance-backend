import mongoose from 'mongoose'
import SessionValidator from './validator'

const Session = new mongoose.Schema({
  slug: {
    type: String,
    required: 'Session Slug required ',
    lowercase: true,
    trim: true,
    unique: true,
    validate: [
      SessionValidator.slug,
      'slug name should be at-least 4 characters long',
    ],
  },

  sessionName: {
    type: String,
    required: 'Session Name Required',
    trim: true,
    validate: [
      SessionValidator.genericText,
      'only alphanumeric characters allowed as session names',
    ],
  },

  startTime: {
    type: Number,
    required: 'Starting timestamp required',
  },

  endTime: {
    type: Number,
    required: 'Ending timestamp required',
  },

  overtimePermission: {
    type: Boolean,
    required: 'Overtime permissions required to create session',
  },

  admin: {
    type: String,
    required: 'admin user._id required',
  },

  participants: [
    {
      type: String,
      required: 'participant user._id required',
    },
  ],

  createdAt: [
    {
      type: Number,
      required: 'createdAt should be a unix timestamp',
    },
  ],
})

const SessionModel = mongoose.model('Session', Session)
export { Session as SessionSchema, SessionModel }
