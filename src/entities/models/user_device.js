'use strict'

import { Model, DataTypes } from 'sequelize'

class UserDevice extends Model {
  static init(sequelize) {
    return super.init(
      {
        user_id: DataTypes.INTEGER,
        device_token: DataTypes.STRING
      },
      { sequelize, modelName: 'UserDevice', tableName: 'user_devices' }
    )
  }
}

export default UserDevice
