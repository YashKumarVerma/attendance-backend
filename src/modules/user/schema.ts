import mongoose from 'mongoose'
import UserValidator from './validator'

const User = new mongoose.Schema({
  username: {
    type: String,
    required: 'Username Required',
    unique: true,
    lowercase: true,
    trim: true,
    validate: [UserValidator.username, 'invalid username passed'],
  },
  fullName: {
    type: String,
    required: 'First name Required',
    trim: true,
    validate: [
      UserValidator.genericText,
      'only alphanumeric characters allowed in full name',
    ],
  },
  profilePicture: {
    type: String,
    default: 'http://via.placeholder.com/150',
    trim: true,
    validate: [
      UserValidator.link,
      'invalid url passed as profile picture link',
    ],
  },
  email: {
    type: String,
    required: 'E-Mail Address required',
    unique: true,
    lowercase: true,
    validate: [UserValidator.email, 'invalid email passed'],
    trim: true,
  },
  password: {
    type: String,
    required: true,
    validate: [UserValidator.password, 'insecure password'],
  },
})

const UserModel = mongoose.model('User', User)
export { User as UserSchema, UserModel }
