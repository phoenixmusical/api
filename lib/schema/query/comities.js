'use strict';
const graphql = require('graphql');
const ComityType = require('../types/Comity');
const db = require('../../db');

module.exports = {
    type: new graphql.GraphQLList(ComityType.Comity),
    resolve: function (parent, args, session) {
        return db('comity').select();
    },
};
