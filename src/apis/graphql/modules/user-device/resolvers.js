import models from '../../../../entities/models'
import { validateUserFromSession } from '../../../../common/validators/user/validator'

export default {
  Mutation: {
    saveDeviceToken: async (_, { deviceToken }, { session }) => {
      await validateUserFromSession(session)

      const UserDevice = models.UserDevice
      const user = session.user
      const userDevice = await UserDevice.findOne({ where: { user_id: user.id } })

      if (userDevice && userDevice.id) {
        await userDevice.update({ device_token: deviceToken })
        return true
      }

      await UserDevice.create({
        user_id: user.id,
        device_token: deviceToken
      })

      return true
    }
  }
}
