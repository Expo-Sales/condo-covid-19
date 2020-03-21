import { gql } from 'apollo-server-lambda'

export default gql`
  type Mutation {
    saveDeviceToken(deviceToken: String!): Boolean
  }
`
