const { GraphQLList, GraphQLID} = require('graphql');
const { UserType, PostType } = require('./types');
const { User, Post } = require('../models');

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

const posts = {
    type: new GraphQLList(PostType),
    description: 'get all posts',
    resolve: () => Post.find()
}

const post = {
    type: PostType,
    description: 'get 1 post',
    args: {
        id: {type: GraphQLID}
    },
    resolve(_, args) {
        return Post.findById(args.id);
    }
}

module.exports = {users, user, posts, post};