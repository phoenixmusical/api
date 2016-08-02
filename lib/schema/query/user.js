'use strict';
const graphql = require('graphql');
const UserType = require('../types/User');
const db = require('../../db');

module.exports = {
    type: UserType.User,
    args: {
        id: { type: graphql.GraphQLID },
    },
    resolve: function (parent, args, session) {
        return db('user').where({ id: args.id }).first();
    },
};
