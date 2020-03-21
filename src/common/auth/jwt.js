import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import models from '../../entities/models'

const jwtSecret = process.env.JWT_SECRET

export const tokenGenerator = async data => {
  const User = models.User
  const user = await User.findOne({ where: { email: data.email }, raw: true })

  if (!user || !(await verifyPassword(data.password, user))) {
    throw new Error('User or password invalid.')
  }

  return await generateToken(user)
}

export const generateToken = async user => {
  const accessToken = jwt.sign({ user_id: user.id }, jwtSecret, { expiresIn: process.env.JWT_EXPIRES_IN })

  return accessToken
}

export const verifyPassword = async (password, user) => {
  return await bcrypt.compare(password, user.password_hash)
}

export const getUserByToken = async (err, data) => {
  if (err) {
    throw Error(err)
  }

  const User = models.User
  const user = await User.findByPk(data.user_id)

  return user
}

export const verifyToken = async token => {
  return await jwt.verify(token, jwtSecret, getUserByToken)
}
