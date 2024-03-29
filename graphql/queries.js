const { GraphQLList, GraphQLID} = require('graphql');
const { UserType, PostType, CommentType } = require('./types');
const { User, Post, Comment } = require('../models');

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

const comments = {
    type: new GraphQLList(CommentType),
    description: 'Get all comments',
    resolve: () => Comment.find()
}

const comment = {
    type: CommentType,
    description: 'Get 1 comment',
    args: {
        id: {type: GraphQLID}
    },
    resolve(_, {id}) {
        return Comment.findById(id);
    }
}

module.exports = {users, user, posts, post, comments, comment};