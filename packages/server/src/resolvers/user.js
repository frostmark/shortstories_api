import jwt from 'jsonwebtoken'
import { combineResolvers } from 'graphql-resolvers'
import { AuthenticationError, UserInputError } from 'apollo-server'
import { isAuthenticated, isAdmin } from './authorization'

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user
  return await jwt.sign({ id, email, username, role }, secret, {
    expiresIn,
  })
}

export default {
  Query: {
    users: async (parent, args, { models }) => await models.User.findAll(),
    user: async (parent, { id }, { models }) => await models.User.findById(id),
    me: async (parent, args, { models, me }) => (!me ? null : await models.User.findById(me.id)),
  },
  Mutation: {
    signUp: async (parent, { username, email, password }, { models, secret }) => {
      const user = await models.User.create({
        username,
        email,
        password,
      })

      return { token: createToken(user, secret, '30m') }
    },
    signIn: async (parent, { login, password }, { models, secret }) => {
      const user = await models.User.findByLogin(login)

      if (!user) {
        throw new UserInputError('No user found with this login credentials.')
      }

      const isValid = await user.validatePassword(password)

      if (!isValid) {
        throw new AuthenticationError('Invalid password.')
      }

      return { token: createToken(user, secret, '30m') }
    },
    updateUser: combineResolvers(isAuthenticated, async (parent, { username }, { models, me }) => {
      const user = await models.User.findById(me.id)
      return await user.update({ username })
    }),
    deleteUser: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) =>
        await models.User.destroy({
          where: { id },
        })
    ),
  },
  User: {
    stories: async (user, args, { models }) =>
      await models.Story.findAll({
        where: {
          userId: user.id,
        },
      }),
  },
}
