import validator from 'validator'

export const entityValidator = async params => {
  if (params.email && !validator.isEmail(params.email)) {
    throw new Error('Invalid email. Please enter a valid email address to continue.')
  }

  if (params.cellphone && params.cellphone.length < 11) {
    throw new Error('Cellphone must contain at least 11 numbers.')
  }

  return true
}

export const validateUserFromSession = async session => {
  const user = session.user

  if (!user || !user.email) {
    throw new Error('User not found')
  }

  return true
}

export const chainValidator = async validators => {
  return Promise.all(validators)
}

export default chainValidator
