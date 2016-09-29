'use strict';
const graphql = require('graphql');
const relay = require('graphql-relay');
const nodeDefinition = require('./nodeDefinition');
const CommitteeType = require('./Committee');

exports.User = new graphql.GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: relay.globalIdField('User'),
        email: { type: graphql.GraphQLString },
        firstname: { type: graphql.GraphQLString },
        lastname: { type: graphql.GraphQLString },
        name: {
            type: graphql.GraphQLString,
            resolve: (user) => `${user.firstname} ${user.lastname}`.trim(),
        },
        committees: {
            type: relay.connectionDefinitions({
                name: 'Committee',
                nodeType: CommitteeType.Committee,
            }).connectionType,
            description: 'A user committees',
            args: relay.connectionArgs,
            resolve: (user, args) =>
                relay.connectionFromPromisedArray(user.findCommittees(), args),
        },
    }),
    interfaces: [nodeDefinition.nodeInterface],
});

nodeDefinition.addType('User', exports.User);
