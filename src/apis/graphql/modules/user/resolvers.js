import models from '../../../../entities/models'
import { validateUserFromSession, entityValidator, chainValidator } from '../../../../common/validators/user/validator'

export default {
  Query: {
    me: async (_, __, { session }) => {
      await validateUserFromSession(session)
      return session.user
    }
  },

  Mutation: {
    createUser: async (_, { data }) => {
      await entityValidator(data)

      const User = models.User
      const user = await User.createUser(data)

      return user
    },

    updateUser: async (_, { data }, { session }) => {
      await chainValidator([validateUserFromSession(session), entityValidator(data)])
      const user = session.user
      const User = models.User
      await user.update(data)

      return await User.findByPk(user.id)
    },

    deleteUser: async (_, __, { session }) => {
      await validateUserFromSession(session)
      const user = session.user

      await user.destroy({ where: { id: user.id } })
      return true
    }
  }
}
