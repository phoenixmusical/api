'use strict';
const graphql = require('graphql');
const nodeDefinition = require('../types/nodeDefinition');

const Query = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        node: nodeDefinition.nodeField,
        committees: require('./committees'),
        user: require('./user'),
        committee: require('./committee'),
        events: require('./events'),
        me: require('./me'),
        view: {
            type: Query,
            resolve: () => ({}),
        },
    }),
});

module.exports = Query;
