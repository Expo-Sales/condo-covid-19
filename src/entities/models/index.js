import Sequelize from 'sequelize'
import config from '../config/database'

const db = {}
const sequelize = new Sequelize(config)

import User from './user'
import UserDevice from './user_device'

User.init(sequelize)
UserDevice.init(sequelize)

db['User'] = User
db['UserDevice'] = UserDevice

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
