'use strict';
const graphql = require('graphql');
const relay = require('graphql-relay');
const nodeDefinition = require('./nodeDefinition');
const baseFields = require('./baseFields');

exports.Message = new graphql.GraphQLObjectType({
    name: 'Message',
    fields: () => baseFields({
        id: relay.globalIdField('Message'),
        content: { type: graphql.GraphQLString },
    }),
    interfaces: [nodeDefinition.nodeInterface],
});

nodeDefinition.addType('Message', exports.Message);

const connectionDefinitions = relay.connectionDefinitions({
    name: 'Message',
    nodeType: exports.Message,
});

exports.MessageConnection = connectionDefinitions.connectionType;
exports.MessageEdge = connectionDefinitions.edgeType;
