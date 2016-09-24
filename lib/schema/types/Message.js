'use strict';
const graphql = require('graphql');
const db = require('../../db');
const baseFields = require('./baseFields');
const PostType = require('./Post');

exports.Message = new graphql.GraphQLObjectType({
    name: 'Message',
    fields: () => baseFields({
        content: { type: graphql.GraphQLString },
        post: {
            type: PostType.Post,
            resolve: function (message) {
                return db('post')
                    .where({ id: message.post_id })
                    .first();
            },
        },
    }),
});
