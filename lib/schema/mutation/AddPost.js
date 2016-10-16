'use strict';
const graphql = require('graphql');
const relay = require('graphql-relay');
const data = require('../data');
const CommitteeType = require('../types/Committee');
const PostType = require('../types/Post');

module.exports = relay.mutationWithClientMutationId({
    name: 'AddPost',
    inputFields: {
        committeeId: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLID),
        },
        name: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString),
        },
    },
    outputFields: () => ({
        committee: {
            type: CommitteeType.Committee,
        },
        postEdge: {
            type: PostType.PostEdge,
            resolve: payload =>
                Promise.all([
                    data.Committee.findById(payload.committeeId)
                        .then(committee => committee.findPosts()),
                    data.Post.findById(payload.postId),
                ])
                    .then(results => ({
                        cursor: relay.offsetToCursor(
                            results[0].findIndex(post => post.id === payload.postId)
                        ),
                        node: results[1],
                    })),
        },
    }),
    mutateAndGetPayload: (input, session) => {
        console.log('input', input);
        console.log('session', session);
        if (!session.user) {
            throw new Error('You need to be logged in to perform this action');
        }

        const committeeId = relay.fromGlobalId(input.committeeId);
        if (committeeId.type !== 'Committee') {
            throw new Error('committeeId is not a valid Committee ID');
        }

        return data.Committee.findById(committeeId.id)
            .then(committee => {
                if (!committee) {
                    throw new Error('no committee found with this committeeId');
                }

                return committee.addPost(input.name, session.user.id)
                    .then(postId => ({
                        postId: postId,
                        committeeId: committee.id,
                    }));
            });
    },
});
