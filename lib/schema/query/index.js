'use strict';
const graphql = require('graphql');
const UserType = require('../types/User');

const Query = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        user: require('./user'),
        comity: require('./comity'),
        comities: require('./comities'),
        events: require('./events'),
        view: {
            type: Query,
            resolve: () => ({}),
        },
        me: {
            type: UserType.User,
            resolve: () => null,
        },
    }),
});

module.exports = Query;
