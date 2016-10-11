'use strict';
const graphql = require('graphql');
const EventType = require('../types/Event');
const Event = require('../data').Event;

module.exports = {
    type: new graphql.GraphQLList(EventType.Event),
    args: {
        startDate: { type: graphql.GraphQLString },
        endDate: { type: graphql.GraphQLString },
    },
    resolve: (parent, args) => Event.findByRange(args.startDate, args.endDate),
};
