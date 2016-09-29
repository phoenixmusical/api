'use strict';
const graphql = require('graphql');
const relay = require('graphql-relay');
const nodeDefinition = require('./nodeDefinition');
const baseFields = require('./baseFields');
const CommitteeType = require('./Committee');

exports.Event = new graphql.GraphQLObjectType({
    name: 'Event',
    fields: () => baseFields({
        id: relay.globalIdField('Event'),
        name: { type: graphql.GraphQLString },
        description: { type: graphql.GraphQLString },
        startDate: {
            type: graphql.GraphQLString,
            resolve: event => new Date(Date.parse(event.start_date)).toISOString(),
        },
        endDate: {
            type: graphql.GraphQLString,
            resolve: event => new Date(Date.parse(event.end_date)).toISOString(),
        },
        committee: {
            type: CommitteeType.Committee,
            resolve: post => post.findCommittee(),
        },
    }),
    interfaces: [nodeDefinition.nodeInterface],
});

nodeDefinition.addType('Event', exports.Event);
