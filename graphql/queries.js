const { GraphQLList, GraphQLID} = require('graphql');
const { UserType } = require('./types');
const { User } = require('../models');

const users = {
    type: new GraphQLList(UserType),
    resolve() {
        return User.find()
    }
}

const user = {
    type: UserType,
    description: 'only 1 user',
    args: {
        id: {type: GraphQLID}
    },
    resolve(_, args) {
        return User.findById(args.id);
    }
}

module.exports = {users, user};