'use strict';
const graphql = require('graphql');
const db = require('../../db');
const baseFields = require('./baseFields');
const UserType = require('./User');
const PostType = require('./Post');
const EventType = require('./Event');

exports.Comity = new graphql.GraphQLObjectType({
    name: 'Comity',
    fields: () => baseFields({
        name: { type: graphql.GraphQLString },
        description: { type: graphql.GraphQLString },
        members: {
            type: new graphql.GraphQLList(UserType.User),
            resolve: function (comity) {
                return db('user')
                    .innerJoin('comity_member', 'comity_member.user_id', 'user.id')
                    .where({ 'comity_member.comity_id': comity.id })
                    .select('user.*');
            },
        },
        posts: {
            type: new graphql.GraphQLList(PostType.Post),
            resolve: function (comity) {
                return db('post')
                    .where({ comity_id: comity.id })
                    .select();
            },
        },
        events: {
            type: new graphql.GraphQLList(EventType.Event),
            resolve: function (comity) {
                return db('event')
                    .where({ comity_id: comity.id })
                    .select();
            },
        },
    }),
});
