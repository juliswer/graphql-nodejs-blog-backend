const {GraphQLString} = require('graphql')

const register = {
    type: GraphQLString,
    description: 'Register a new user',
    async resolve() {
        return 'new user created'
    }
}

module.exports = {register}