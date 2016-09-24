'use strict';
const graphql = require('graphql');
const db = require('../../db');
const baseFields = require('./baseFields');
const ComityType = require('./Comity');
const MessageType = require('./Message');

exports.Post = new graphql.GraphQLObjectType({
    name: 'Post',
    fields: () => baseFields({
        name: { type: graphql.GraphQLString },
        importance: { type: graphql.GraphQLInt },
        comity: {
            type: ComityType.Comity,
            resolve: function (post) {
                return db('comity')
                    .where({ id: post.comity_id })
                    .first();
            },
        },
        messages: {
            type: new graphql.GraphQLList(MessageType.Message),
            resolve: function (post) {
                return db('message')
                    .where({ post_id: post.id })
                    .select();
            },
        },
    }),
});
