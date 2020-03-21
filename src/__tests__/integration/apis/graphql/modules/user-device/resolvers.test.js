import faker from 'faker'

import resolver from '../../../../../../apis/graphql/modules/user-device/resolvers'
import { truncate } from '../../../../../utils/postgres'
import models from '../../../../../../entities/models'
import { userCanReceiveMessageAndInfected } from '../../../../../__fixtures__/user/mock'

describe('User Device GraphQL Resolver', () => {
  afterEach(async () => {
    try {
      await truncate()
    } catch (error) {
      // do nothing
    }
  })

  test('Create Device Token', async () => {
    const User = models.User

    const user = await User.createUser(userCanReceiveMessageAndInfected())

    const deviceToken = faker.random.uuid()

    await resolver.Mutation.saveDeviceToken(null, { deviceToken }, { session: { user } })

    const UserDevice = models.UserDevice
    const userDevice = await UserDevice.findOne({ where: { user_id: user.id } })
    expect(userDevice.device_token).toBe(deviceToken)
  })

  test('Update Device Token', async () => {
    const User = models.User
    const UserDevice = models.UserDevice

    const user = await User.createUser(userCanReceiveMessageAndInfected())

    await UserDevice.create({
      user_id: user.id,
      device_token: faker.random.uuid()
    })

    const deviceToken = faker.random.uuid()

    await resolver.Mutation.saveDeviceToken(null, { deviceToken }, { session: { user } })

    const userDevice = await UserDevice.findOne({ where: { user_id: user.id } })
    expect(userDevice.device_token).toBe(deviceToken)
  })
})
