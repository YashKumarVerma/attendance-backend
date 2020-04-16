import validator from 'validator'

class UserValidator {
  // function to put validations on username
  static username(username: string): boolean {
    return (
      validator.isAlphanumeric(username) &&
      validator.isLength(username, { min: 4, max: 20 })
    )
  }

  static email(email: string): boolean {
    return validator.isEmail(email)
  }

  // function to validate profile url
  static link(url: string): boolean {
    return validator.isURL(url)
  }

  // function to validate password
  static password(password: string): boolean {
    return validator.isLength(password, { min: 6 })
  }

  //   function to validate generic text fields
  static genericText(text: string): boolean {
    return validator.isLength(text, { min: 0 })
  }
}

export default UserValidator
