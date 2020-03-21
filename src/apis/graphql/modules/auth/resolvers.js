import { tokenGenerator } from '../../../../common/auth/jwt'

export default {
  Mutation: {
    generateToken: async (_, { data }) => {
      return await tokenGenerator(data)
    }
  }
}
