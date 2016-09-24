'use strict';
const graphql = require('graphql');
const db = require('../../db');
const baseFields = require('./baseFields');
const ComityType = require('./Comity');

exports.Event = new graphql.GraphQLObjectType({
    name: 'Event',
    fields: () => baseFields({
        name: { type: graphql.GraphQLString },
        description: { type: graphql.GraphQLString },
        startDate: {
            type: graphql.GraphQLString,
            resolve: (event) => new Date(Date.parse(event.start_date)).toISOString(),
        },
        endDate: {
            type: graphql.GraphQLString,
            resolve: (event) => new Date(Date.parse(event.end_date)).toISOString(),
        },
        comity: {
            type: ComityType.Comity,
            resolve: function (post) {
                return db('comity')
                    .where({ id: post.comity_id })
                    .first();
            },
        },
    }),
});
