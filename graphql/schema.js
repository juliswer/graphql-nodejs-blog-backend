const {GraphQLSchema, GraphQLObjectType} = require('graphql')
const {users, user, posts, post} = require('./queries')
const {register, login, createPost, updatePost} = require('./mutations')

const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'This is the root query',
    fields: {
        users,
        user,
        posts,
        post
    }
})

const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'This is the root mutation',
    fields: {
        register,
        login,
        createPost,
        updatePost
    }
})

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
})