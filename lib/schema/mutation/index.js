'use strict';
const graphql = require('graphql');

module.exports = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addPost: require('./AddPost'),
        writeMessage: require('./WriteMessage'),
    }),
});
