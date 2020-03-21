import { gql } from 'apollo-server-lambda'

export default gql`
  input UserCredentials {
    email: String!
    password: String!
  }

  input Image {
    base64: String!
    extension: String!
    fileName: String!
  }

  input FacebookCredentials {
    first_name: String!
    last_name: String!
    email: String!
    facebook_user_id: String!
    facebook_user_token: String!
    avatar: Image
  }

  type Mutation {
    authFacebookUser(data: FacebookCredentials): String
    generateToken(data: UserCredentials!): String
  }
`
