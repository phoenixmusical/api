'use strict';
const graphql = require('graphql');
const EventType = require('../types/Event');
const Event = require('../data').Event;

module.exports = {
    type: new graphql.GraphQLList(EventType.Event),
    resolve: () => Event.findAll(),
};
