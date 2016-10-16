'use strict';
const graphql = require('graphql');
const relay = require('graphql-relay');
const data = require('../data');
const PostType = require('../types/Post');
const MessageType = require('../types/Message');

module.exports = relay.mutationWithClientMutationId({
    name: 'WriteMessage',
    inputFields: {
        postId: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLID),
        },
        content: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString),
        },
    },
    outputFields: () => ({
        post: {
            type: PostType.Post,
        },
        messageEdge: {
            type: MessageType.MessageEdge,
            resolve: payload =>
                Promise.all([
                    data.Post.findById(payload.postId)
                        .then(post => post.findMessages()),
                    data.Message.findById(payload.messageId),
                ])
                    .then(results => ({
                        cursor: relay.offsetToCursor(
                            results[0].findIndex(message => message.id === payload.messageId)
                        ),
                        node: results[1],
                    })),
        },
    }),
    mutateAndGetPayload: (input, session) => {
        if (!session.user) {
            throw new Error('You need to be logged in to perform this action');
        }

        const postId = relay.fromGlobalId(input.postId);
        if (postId.type !== 'Post') {
            throw new Error('postId is not a valid Post ID');
        }

        return data.Post.findById(postId.id)
            .then(post => {
                if (!post) {
                    throw new Error('no post found with this postId');
                }

                return post.addMessage(input.content, session.user.id)
                    .then(messageId => ({
                        messageId: messageId,
                        postId: post.id,
                    }));
            });
    },
});
