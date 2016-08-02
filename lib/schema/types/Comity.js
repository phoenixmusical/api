'use strict';
const graphql = require('graphql');
const db = require('../../db');
const UserType = require('./User');

exports.Comity = new graphql.GraphQLObjectType({
    name: 'Comity',
    fields: () => ({
        id: { type: graphql.GraphQLID },
        name: { type: graphql.GraphQLString },
        description: { type: graphql.GraphQLString },
        addedOn: {
            type: graphql.GraphQLString,
            resolve: comity => comity.added_on.toISOString(),
        },
        updatedOn: {
            type: graphql.GraphQLString,
            resolve: comity => comity.updated_on.toISOString(),
        },
        addedBy: {
            type: UserType.User,
            resolve: function (comity) {
                return db('user')
                    .where({ id: comity.added_by })
                    .first();
            },
        },
        members: {
            type: new graphql.GraphQLList(UserType.User),
            resolve: function (comity) {
                return db('user')
                    .innerJoin('comity_member', 'comity_member.user_id', 'user.id')
                    .where({ 'comity_member.comity_id': comity.id })
                    .select('user.*');
            },
        },
    }),
});
