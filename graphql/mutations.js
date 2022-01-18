const {GraphQLString} = require('graphql')
const {User, Post} = require('../models')
const {createJWTToken} = require('../util/auth')
const {PostType} = require('./types')

const register = {
    type: GraphQLString,
    description: 'Register a new user and return a JWT token',
    args: {
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        displayName: {type: GraphQLString}
    },
    async resolve(_, args) {
        const {username, email, password, displayName} = args
        /* const newUser = await User.create({
            username,
            email,
            password,
            displayName
        }) */

        const user = new User({username, email, password, displayName})
        await user.save();

        const token = createJWTToken({_id: user._id, username: user.username, email: user.email, displayName: user.displayName})
        return token;
    }
}

const login = {
    type: GraphQLString,
    description: 'Login a user and return a JWT token',
    args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString}
    },
    async resolve(_, args) {
        const user = await User.findOne({email: args.email}).select('+password')
        if (!user || args.password !== user.password) throw new Error('Invalid Credentials');
        const token = createJWTToken({_id: user._id, username: user.username, email: user.email, displayName: user.displayName})
        return token;
    }
}

const createPost = {
    type: PostType,
    description: 'Create a new post',
    args: {
        title: {type: GraphQLString},
        body: {type: GraphQLString}
    },
    async resolve(_, args, {verifiedUser}) {
        const post = new Post({
            title: args.title,
            body: args.body,
            authorId: verifiedUser._id
        })

        await post.save()

        return post
    }
}

const updatePost = {
    type: PostType,
    description: 'Update a post',
    args: {
        id: {type: GraphQLString},
        title: {type: GraphQLString},
        body: {type: GraphQLString}
    },
    async resolve(_, {id, title, body}, {verifiedUser}) {
        if(!verifiedUser) throw new Error("Unauthorized")

        const updatedPost = await Post.findOneAndUpdate(
            {_id: id, authorId: verifiedUser._id}, 
            {title, body}, 
            {new: true, runValidators: true}
        )

        return updatedPost;
    }
}

const deletePost = {
    type: GraphQLString,
    description: 'Delete a post',
    args: {
        id: {type: GraphQLString}
    },
    async resolve(_, {id}, {verifiedUser}) {
        if(!verifiedUser) throw new Error("Unauthorized")

        const deletedPost = await Post.findOneAndDelete({_id: id, authorId: verifiedUser._id})

        if(!deletedPost) throw new Error("Post not found");

        return "Post deleted successfully";
    }
}

module.exports = {register, login, createPost, updatePost, deletePost}