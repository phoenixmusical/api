'use strict';
const graphql = require('graphql');
const EventType = require('../types/Event');
const db = require('../../db');

module.exports = {
    type: new graphql.GraphQLList(EventType.Event),
    resolve: function (parent, args, session) {
        return db('event').select();
    },
};
