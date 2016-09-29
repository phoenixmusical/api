'use strict';
const graphql = require('graphql');
const db = require('../../db');
const UserType = require('./User');

module.exports = (fields) => Object.assign({
    addedOn: {
        type: graphql.GraphQLString,
        resolve: self => self.added_on.toISOString(),
    },
    updatedOn: {
        type: graphql.GraphQLString,
        resolve: self => self.updated_on.toISOString(),
    },
    addedBy: {
        type: UserType.User,
        resolve: self => self.findAddedBy(),
    },
}, fields);
