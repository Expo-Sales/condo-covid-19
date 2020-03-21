import { Model, DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'

import { generateToken } from '../../common/auth/jwt'

class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        cellphone: DataTypes.STRING,
        dob: DataTypes.DATE,
        cep: DataTypes.STRING,
        password_hash: DataTypes.STRING,
        can_receive_message: DataTypes.BOOLEAN,
        is_infected: DataTypes.BOOLEAN
      },
      { sequelize, modelName: 'User', tableName: 'users' }
    )
  }

  static async createUser(data) {
    const passwordHash = await this.generatePasswordHash(data)
    delete data.password

    data.password_hash = passwordHash

    const user = await this.create(data)
    delete user.password_hash
    user.token = await generateToken(user)

    return user
  }

  static async generatePasswordHash({ password }) {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    return passwordHash
  }
}

export default User
