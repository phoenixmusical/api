'use strict';
const graphql = require('graphql');
const UserType = require('../types/User');
const User = require('../data').User;

module.exports = {
    type: UserType.User,
    args: {
        id: { type: graphql.GraphQLID },
    },
    resolve: (parent, args) => User.findById(args.id),
};
