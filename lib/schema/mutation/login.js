'use strict';
const graphql = require('graphql');
const relay = require('graphql-relay');
const data = require('../data');
const UserType = require('../types/User');

module.exports = relay.mutationWithClientMutationId({
    name: 'Login',
    inputFields: {
        email: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString),
        },
        password: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString),
        },
    },
    outputFields: {
        user: {
            type: UserType.User,
            resolve: payload => payload.user,
        },
    },
    mutateAndGetPayload: args => data.User.find({ email: args.email })
        .then(user => ({
            user: user,
        })),
});
