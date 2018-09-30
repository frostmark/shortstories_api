import { gql } from 'apollo-server-express'

export default gql`
  type Me {
    id: ID!
    username: String!
    photo: String!
    email: String!
    isVerified: Boolean!
    writtenStories: [Story!]!
    likedStories: [Story!]!
    viewedStories: [Story!]!
  }

  type User {
    id: ID!
    username: String!
    photo: String
    writtenStories: [Story!]!
  }

  extend type Query {
    me: Me
    user(id: ID!): User
  }

  extend type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
    ): Me!
    signIn(login: String!, password: String!): Me!
    signOut: Boolean!
    verifyUser(token: String!): Boolean!
    checkUserExist(login: String!): Boolean!
    forgotPassword(login: String!): String
    changePassword(token: String!, newPassword: String!): Me!
    updateUser(username: String, photo: String): Me!
    postPhoto(
      file: Upload!
      width: Float!
      height: Float!
      x: Float!
      y: Float!
    ): Me!
  }
`
