'use strict';
const graphql = require('graphql');

module.exports = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        user: require('./user'),
        comity: require('./comity'),
        events: require('./events'),
    },
});
