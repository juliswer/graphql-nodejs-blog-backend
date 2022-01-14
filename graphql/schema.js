const {GraphQLSchema, GraphQLObjectType} = require('graphql')
const {hello} = require('./queries')

const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'This is the root query',
    fields: {
        hello
    }
})

module.exports = new GraphQLSchema({
    query: QueryType
})