'use strict';
const graphql = require('graphql');
const UserType = require('../types/User');

module.exports = {
    type: UserType.User,
    resolve: (parent, args, session) => null,
};
