'use strict';
const graphql = require('graphql');
const db = require('../../db');
const ComityType = require('./Comity');

exports.Post = new graphql.GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: graphql.GraphQLID },
        name: { type: graphql.GraphQLString },
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
