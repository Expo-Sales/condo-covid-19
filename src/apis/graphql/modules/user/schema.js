import { gql } from 'apollo-server-lambda'

export default gql`
  type User {
    id: Int
    name: String
    email: String
    cellphone: String
    cep: String
    can_receive_message: Boolean
    is_infected: Boolean
    token: String
  }

  type Query {
    me: User
  }

  input UserInput {
    name: String!
    email: String!
    cellphone: String!
    password: String!
    cep: String!
    can_receive_message: Boolean
    is_infected: Boolean
  }

  type Mutation {
    createUser(data: UserInput!): User
    updateUser(data: UserInput!): User
    deleteUser: Boolean
  }
`
