'use strict';
const graphql = require('graphql');
const db = require('../../db');
const ComityType = require('./Comity');

exports.User = new graphql.GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: graphql.GraphQLID },
        email: { type: graphql.GraphQLString },
        firstname: { type: graphql.GraphQLString },
        lastname: { type: graphql.GraphQLString },
        name: {
            type: graphql.GraphQLString,
            resolve: (user) => `${user.firstname} ${user.lastname}`.trim(),
        },
        comities: {
            type: new graphql.GraphQLList(ComityType.Comity),
            resolve: function (user) {
                return db('comity')
                    .innerJoin('comity_member', 'comity_member.comity_id', 'comity.id')
                    .where({ 'comity_member.user_id': user.id })
                    .select('comity.*');
            },
        },
    }),
});
