'use strict';
const graphql = require('graphql');
const nodeDefinition = require('../types/nodeDefinition');

const App = new graphql.GraphQLObjectType({
    name: 'App',
    fields: () => ({
        committees: require('./committees'),
        events: require('./events'),
    }),
});

const Query = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        node: nodeDefinition.nodeField,
        viewer: require('./viewer'),
        app: {
            type: App,
            resolve: () => ({}),
        },
    }),
});

module.exports = Query;
