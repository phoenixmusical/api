'use strict';
const graphql = require('graphql');
const UserType = require('../types/User');
const User = require('../data').User;

module.exports = {
    type: UserType.User,
    resolve: (parent, args, session) => session.user ? User.findById(session.user.id) : null,
};
