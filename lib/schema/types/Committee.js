'use strict';
const graphql = require('graphql');
const relay = require('graphql-relay');
const nodeDefinition = require('./nodeDefinition');
const baseFields = require('./baseFields');
const UserType = require('./User');
const PostType = require('./Post');
const EventType = require('./Event');

exports.Committee = new graphql.GraphQLObjectType({
    name: 'Committee',
    fields: () => baseFields({
        id: relay.globalIdField('Committee'),
        name: { type: graphql.GraphQLString },
        description: { type: graphql.GraphQLString },
        members: {
            type: relay.connectionDefinitions({
                name: 'User',
                nodeType: UserType.User,
            }).connectionType,
            description: 'A committee members',
            args: relay.connectionArgs,
            resolve: (committee, args) =>
                relay.connectionFromPromisedArray(committee.findMembers(), args),
        },
        posts: {
            type: PostType.PostConnection,
            description: 'A committee posts',
            args: relay.connectionArgs,
            resolve: (committee, args) =>
                relay.connectionFromPromisedArray(committee.findPosts(), args),
        },
        events: {
            type: relay.connectionDefinitions({
                name: 'Event',
                nodeType: EventType.Event,
            }).connectionType,
            description: 'A committee events',
            args: relay.connectionArgs,
            resolve: (committee, args) =>
                relay.connectionFromPromisedArray(committee.findEvents(), args),
        },
    }),
    interfaces: [nodeDefinition.nodeInterface],
});

nodeDefinition.addType('Committee', exports.Committee);
