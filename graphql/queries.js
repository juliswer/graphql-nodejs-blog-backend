const {GraphQLString, GraphQLList} = require('graphql');
const { UserType } = require('./types');
const { User } = require('../models');

const users = {
    type: new GraphQLList(UserType),
    async resolve() {
        const users = await User.find()

        console.log(users)

        return users
    }
}

module.exports = {users};