const {GraphQLObjectType, GraphQLString, GraphQLID} = require('graphql');

const UserType = new GraphQLObjectType({
    fields: {
        id: {type: GraphQLID},
        user: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        displayName: {type: GraphQLString},
    }
})

module.exports = {
    UserType
}