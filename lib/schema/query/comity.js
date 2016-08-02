'use strict';
const graphql = require('graphql');
const ComityType = require('../types/Comity');
const db = require('../../db');

module.exports = {
    type: ComityType.Comity,
    args: {
        id: { type: graphql.GraphQLID },
    },
    resolve: function (parent, args, session) {
        return db('comity').where({ id: args.id }).first();
    },
};
