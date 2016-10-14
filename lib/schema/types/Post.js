'use strict';
const graphql = require('graphql');
const relay = require('graphql-relay');
const nodeDefinition = require('./nodeDefinition');
const baseFields = require('./baseFields');
const CommitteeType = require('./Committee');
const MessageType = require('./Message');

exports.Post = new graphql.GraphQLObjectType({
    name: 'Post',
    fields: () => baseFields({
        id: relay.globalIdField('Post'),
        name: { type: graphql.GraphQLString },
        importance: { type: graphql.GraphQLInt },
        committee: {
            type: CommitteeType.Committee,
            description: 'A post committee',
            resolve: post => post.findCommittee(),
        },
        messages: {
            type: MessageType.MessageConnection,
            description: 'A post messages',
            args: relay.connectionArgs,
            resolve: (post, args) =>
                relay.connectionFromPromisedArray(post.findMessages(), args),
        },
    }),
    interfaces: [nodeDefinition.nodeInterface],
});

nodeDefinition.addType('Post', exports.Post);
