'use strict';
const graphql = require('graphql');

module.exports = new graphql.GraphQLSchema({
    query: require('./query'),
    mutation: require('./mutation'),
});
